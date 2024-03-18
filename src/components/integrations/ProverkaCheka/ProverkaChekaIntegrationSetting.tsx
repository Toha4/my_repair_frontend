import React from "react";
import {
  Box,
  Button,
  Flex,
  Heading,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger,
  Spinner,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import style from "./../Integrations.module.scss";
import useTranslation from "next-translate/useTranslation";
import { FormProvider, useForm } from "react-hook-form";
import CheckboxForm from "../../common/forms/elements/CheckboxForm";
import InputForm from "../../common/forms/elements/InputForm";
import { Api } from "../../../utils/api";
import { ProverkaChekaIntegrationSettingsType } from "../../../utils/api/types";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { setUserSettings } from "../../../redux/slices/authSlice";
import { OurStore } from "../../../redux/store";
import ApiKeyFormModal, { IFormApiKey } from "../forms/ApiKeyFormModal";
import { QuestionOutlineIcon } from "@chakra-ui/icons";

interface IFormProverkaChekaIntegration {
  is_enabled: boolean;
  api_key: string;
}

const ProverkaChekaIntegrationSettings: React.FC = () => {
  const { t } = useTranslation("integrations");

  const toast = useToast();

  const { user } = useAppSelector((state: OurStore) => state.authReducer);
  const dispatch = useAppDispatch();

  const { isOpen: isOpenForm, onOpen: onOpenForm, onClose: onCloseForm } = useDisclosure();

  const [loading, setLoading] = React.useState<boolean>(false);
  const [updateLoading, setUpdateloading] = React.useState<boolean>(false);

  const methodsForm = useForm<IFormProverkaChekaIntegration>({
    mode: "onTouched",
    reValidateMode: "onSubmit",
  });
  const { reset, watch, setValue } = methodsForm;

  React.useEffect(() => {
    setLoading(true);

    const fetchData = async () => {
      const result = await Api().proverkaChekaIntegration.getIntegrationSettings();
      reset({
        is_enabled: result.is_enabled,
        api_key: result.api_key,
      });

      setLoading(false);
    };

    fetchData();
  }, []);

  const handleEnterApiKey = () => {
    onOpenForm();
  };

  const setEnabledIntegration = (enabled: boolean) => {
    if (updateLoading) {
      return;
    }

    setUpdateloading(true);

    Api()
      .proverkaChekaIntegration.updateIntegrationSettings({ is_enabled: enabled })
      .then((result: ProverkaChekaIntegrationSettingsType) => {
        setValue("is_enabled", result.is_enabled);

        // Обновляем настройки пользователя
        if (dispatch) {
          dispatch(setUserSettings({ ...user?.settings, is_proverka_cheka_integration: result.is_enabled }));
        }
      })
      .catch((err) => {
        console.warn("Error update integration", err);
        toast({ title: t("common:unknownError"), status: "error" });

        setValue("is_enabled", !enabled);
      })
      .finally(() => {
        setUpdateloading(false);
      });
  };

  const handleApiKeyUpdate = (form: IFormApiKey) => {
    setUpdateloading(true);

    Api()
      .proverkaChekaIntegration.updateIntegrationSettings({ api_key: form.api_key })
      .then((result: ProverkaChekaIntegrationSettingsType) => {
        setValue("api_key", result.api_key);
      })
      .catch((err) => {
        console.warn("Error update integration", err);
        toast({ title: t("common:unknownError"), status: "error" });
      })
      .finally(() => {
        setUpdateloading(false);
      });
  };

  const gettingApiKeyManual = () => {
    return (
      <Box>
        <Heading width="100%" textAlign="center" size="sm">
          {t("proverkaChekaManualTitle")}
        </Heading>
        <Text>{t("proverkaChekaManual_1")}</Text>{" "}
        <a href="https://proverkacheka.com" target="blank">
          https://proverkacheka.com
        </a>
        <Text>{t("proverkaChekaManual_2")}</Text>
        <Text>{t("proverkaChekaManual_3")}</Text>
        <Text>{t("proverkaChekaManual_4")}</Text>
      </Box>
    );
  };

  return (
    <React.Fragment>
      {isOpenForm && (
        <ApiKeyFormModal isOpen={isOpenForm} onClose={onCloseForm} onSubmit={handleApiKeyUpdate}></ApiKeyFormModal>
      )}

      <Box className={style.integrationSettingsBlock}>
        <a href="https://proverkacheka.com" target="blank">
          https://proverkacheka.com
        </a>
        <Text marginBottom=".5rem">{t("proverkaChekaDescription")}</Text>
        <FormProvider {...methodsForm}>
          <form>
            <Flex maxWidth="400px">
              <CheckboxForm
                title={t("proverkaChekaEnabled")}
                keyItem="is_enabled"
                loading={loading}
                onChange={(e) => {
                  setEnabledIntegration(e.target.checked);
                }}
              />
              {updateLoading && <Spinner />}
            </Flex>
            <Flex gap=".5rem" marginTop=".8rem" alignItems="center">
              <Text>{t("proverkaChekaApiKey")}</Text>
              <Popover>
                <PopoverTrigger>
                  <QuestionOutlineIcon cursor="pointer" color="var(--brandBlue)" />
                </PopoverTrigger>
                <PopoverContent>
                  <PopoverArrow />
                  <PopoverCloseButton />
                  <PopoverBody>{gettingApiKeyManual()}</PopoverBody>
                </PopoverContent>
              </Popover>
            </Flex>
            <Flex marginTop=".4rem" maxWidth="400px" width="100%" flexDirection="row" gap=".75rem" alignItems="end">
              <InputForm keyItem="api_key" loading={loading} isDisabled />
              <Button
                variant="brandOutline"
                minWidth="76px"
                isDisabled={!watch("is_enabled")}
                onClick={() => handleEnterApiKey()}
              >
                {t("proverkaChekaEnter")}
              </Button>
            </Flex>
          </form>
        </FormProvider>
      </Box>
    </React.Fragment>
  );
};

export default ProverkaChekaIntegrationSettings;
