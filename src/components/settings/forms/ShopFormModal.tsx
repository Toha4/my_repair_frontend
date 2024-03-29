import React from "react";
import useTranslation from "next-translate/useTranslation";
import { FormProvider, useForm } from "react-hook-form";
import style from "../Settings.module.scss";
import ModalForm from "../../common/ModalForm";
import { yupResolver } from "@hookform/resolvers/yup";
import { ShopFormSchema } from "../validations";
import InputForm from "../../common/forms/elements/InputForm";
import { Api } from "../../../utils/api";
import { useToast } from "@chakra-ui/react";
import { ShopItemTypes } from "../../../utils/api/types";
import { shopAdded, shopUpdated } from "../../../redux/slices/shopsSlice";
import { useAppDispatch } from "../../../redux/hooks";
import { capitalize } from "../../../utils/DataConvert";
import { IModalForm } from "../../common/forms/types";
import TextareaForm from "../../common/forms/elements/TextareaForm";

interface IFormShop {
  name: string;
  link?: string;
  inn?: string;
  description?: string;
}

const ShopFormModal: React.FC<IModalForm> = ({ id, isOpen, onClose }) => {
  const { t } = useTranslation("settings");

  const methodsForm = useForm<IFormShop>({
    mode: "onTouched",
    reValidateMode: "onSubmit",
    resolver: yupResolver(ShopFormSchema(t)),
  });

  const toast = useToast();

  const {
    reset,
    formState: { errors },
  } = methodsForm;

  const [loading, setLoading] = React.useState<boolean>(false);
  const [submitLoading, setSubmitLoading] = React.useState<boolean>(false);

  const dispatch = useAppDispatch();

  React.useEffect(() => {
    if (id) {
      setLoading(true);

      const fetchData = async () => {
        const result = await Api().shop.get(id);
        reset({ name: result.name, link: result.link, inn: result.inn, description: result.description });

        setLoading(false);
      };

      fetchData();
    }
  }, []);

  const handleSave = async (value: IFormShop) => {
    const data: ShopItemTypes = {
      name: value.name,
      link: value.link,
      inn: value.inn,
      description: value.description,
    };

    try {
      setSubmitLoading(true);

      if (id) {
        await Api()
          .shop.update(id, data)
          .then((shop: ShopItemTypes) => {
            dispatch(shopUpdated(shop));
            setSubmitLoading(false);
          });
      } else {
        await Api()
          .shop.create(data)
          .then((shop: ShopItemTypes) => {
            dispatch(shopAdded(shop));
            setSubmitLoading(false);
          });
      }
    } catch (err) {
      console.warn("Error add or update shop", err);
      toast({ title: t("common:unknownError"), status: "error" });
    } finally {
      onClose();
    }
  };

  return (
    <ModalForm
      isOpen={isOpen}
      header={`${t(id ? "common:actionEdit" : "common:actionAdd")} ${t("common:shop").toLowerCase()}`}
      onClose={onClose}
      okText={t(id ? "common:actionSave" : "common:actionAdd")}
      onOk={methodsForm.handleSubmit(handleSave)}
      isLoadingSubmitButton={submitLoading}
    >
      <FormProvider {...methodsForm}>
        <form className={style.settingForm}>
          <InputForm name={capitalize(t("common:name"))} keyItem="name" isRequired loading={loading} />
          <InputForm name={t("common:link")} keyItem="link" loading={loading} />
          <InputForm name={t("common:inn")} keyItem="inn" loading={loading} isInvalid={!!errors.inn} />
          <TextareaForm name={t("common:note")} keyItem="description" loading={loading} />
        </form>
      </FormProvider>
    </ModalForm>
  );
};

export default ShopFormModal;
