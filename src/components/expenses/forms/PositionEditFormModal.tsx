import React from "react";
import useTranslation from "next-translate/useTranslation";
import { FormProvider, useForm } from "react-hook-form";
import style from "../expenses.module.scss";
import ModalForm from "../../common/ModalForm";
import { yupResolver } from "@hookform/resolvers/yup";
import InputForm from "../../common/forms/elements/InputForm";
import { Api } from "../../../utils/api";
import { Box, Flex, FormControl, FormLabel, Grid, GridItem, Input, useToast } from "@chakra-ui/react";
import { PurchasePositionTypes, PositionType, PositionCheckType } from "../../../utils/api/types";
import { IModalForm } from "../../common/forms/types";
import { IFormCheckPosition } from "./types";
import { PositionFormSchema } from "./validations";
import CheckboxIconForm from "../../common/forms/elements/CheckboxIconForm";
import ServiceIcon from "../../Icons/ServiceIcon";
import InputNumberForm from "../../common/forms/elements/InputNumberForm";
import CategorySelectForm from "../../common/forms/elements/selects/CategorySelectForm";
import RoomSelectForm from "../../common/forms/elements/selects/RoomSelectForm";
import { isCurrentLandMode } from "../../../utils/repairObjects";
import TextareaForm from "../../common/forms/elements/TextareaForm";
import { formatNumber } from "../../../utils/DataConvert";
import DeliveryIcon from "../../Icons/DeliveryIcon";
import { useAppSelector } from "../../../redux/hooks";
import { OurStore } from "../../../redux/store";

export interface IPositionModalForm extends Omit<IModalForm, "id"> {
  position: PurchasePositionTypes;
  updatePosition: (position: PurchasePositionTypes) => void;
}

interface IFormCheckPositionUpdate extends Omit<IFormCheckPosition, "id"> {
  check_date: string;
  check_number: number;
  shop_name: string;
}

const PositionUpdateFormModal: React.FC<IPositionModalForm> = ({ position, isOpen, onClose, updatePosition }) => {
  const { t } = useTranslation("expenses");
  const { user } = useAppSelector((state: OurStore) => state.authReducer);

  const methodsForm = useForm<IFormCheckPositionUpdate>({
    mode: "onTouched",
    reValidateMode: "onSubmit",
    resolver: yupResolver(PositionFormSchema(t)),
    defaultValues: {
      name: position.name,
      room: position.room,
      category: position.category,
      link: position.link,
      note: position.note,
      price: position.price,
      quantity: position.quantity,
      is_service: position.type === PositionType.SERVICE,
      is_delivery: position.type === PositionType.DELIVERY,
      check_date: position.cash_check_date,
      check_number: position.cash_check_id,
      shop_name: position.shop_name,
    },
  });

  const {
    watch,
    setValue,
    formState: { errors },
  } = methodsForm;

  const toast = useToast();

  const [submitLoading, setSubmitLoading] = React.useState<boolean>(false);

  const handleSave = async (value: IFormCheckPosition) => {
    const getType = (is_service: boolean, is_delivery: boolean) => {
      if (is_service) {
        return PositionType.SERVICE;
      } else if (is_delivery) {
        return PositionType.DELIVERY;
      } else {
        return PositionType.PURCHASE;
      }
    };

    const data: PositionCheckType = {
      name: value.name,
      room: value.room,
      category: value.category,
      link: value.link,
      note: value.note,
      price: value.price || 0.0,
      quantity: value.quantity,
      type: getType(value.is_service, value.is_delivery),
    };

    try {
      setSubmitLoading(true);

      await Api()
        .purchase.updatePosition(position.pk, data)
        .then((position: PurchasePositionTypes) => {
          updatePosition(position);

          onClose();
        });
    } catch (err) {
      console.warn("Error add or update category", err);
      toast({ title: t("unknownError"), status: "error" });
    } finally {
      setSubmitLoading(false);
    }
  };

  const calculateAmountPosition = (): string => {
    const price = watch("price");
    const quantity = watch("quantity");

    if (!!price && !!quantity) return `${formatNumber(price * quantity)}`;
    return "0.00";
  };

  return (
    <ModalForm
      isOpen={isOpen}
      header={`${t("common:actionEdit")} ${t("actionPosition")}`}
      onClose={onClose}
      okText={t("common:actionSave")}
      onOk={methodsForm.handleSubmit(handleSave)}
      isLoadingSubmitButton={submitLoading}
      width="80%"
      maxWidth="1000px"
      minWidth="360px"
    >
      <FormProvider {...methodsForm}>
        <form>
          <Box mb="10px">
            <Flex gap="10px">
              <Input
                disabled
                width="12rem"
                value={`${position.cash_check_date} ${t("common:check").toLowerCase()} #${position.cash_check_id}`}
              />
              <Input disabled value={position.shop_name} />
            </Flex>
          </Box>

          <Box width="100%" className={style.position}>
            <Grid templateColumns={{ base: "repeat(12, 1fr)", md: "repeat(24, 1fr)" }} gap="10px" mt="10px">
              <GridItem colSpan={{ base: 12, md: 14 }}>
                <InputForm name={t("common:name")} keyItem={"name"} isRequired isInvalid={!!errors.name} />
              </GridItem>
              <GridItem colSpan={{ base: 6, md: 6 }}>
                <InputForm name={t("common:link")} keyItem={"link"} isInvalid={!!errors.link} autoCompleteDisabled />
              </GridItem>
              <GridItem colSpan={{ base: 3, md: 2 }} mt="40px">
                <CheckboxIconForm
                  icon={<ServiceIcon />}
                  keyItem={"is_service"}
                  tooltipLabel={t("common:service")}
                  onChange={(e) => {
                    if (e.target.checked && watch("is_delivery")) {
                      setValue("is_delivery", false);
                    }
                  }}
                />
              </GridItem>
              <GridItem colSpan={{ base: 3, md: 2 }} mt="40px">
                <CheckboxIconForm
                  icon={<DeliveryIcon />}
                  keyItem={"is_delivery"}
                  tooltipLabel={t("common:delivery")}
                  onChange={(e) => {
                    if (e.target.checked && watch("is_delivery")) {
                      setValue("is_service", false);
                    }
                  }}
                />
              </GridItem>
            </Grid>

            <Grid
              templateColumns={{ base: "repeat(12, 1fr)", md: "repeat(24, 1fr)" }}
              gap="10px"
              alignItems="center"
              mt="10px"
            >
              <GridItem colSpan={{ base: 7, md: 8 }}>
                <RoomSelectForm
                  name={isCurrentLandMode(user) ? t("common:buildingAndRoom") : t("common:room")}
                  keyItem={"room"}
                  isRequired
                  isInvalid={!!errors.room}
                />
              </GridItem>
              <GridItem colSpan={{ base: 5, md: 6 }}>
                <CategorySelectForm keyItem={"category"} isRequired isInvalid={!!errors.category} />
              </GridItem>
              <GridItem colSpan={{ base: 4, md: 3 }}>
                <InputForm
                  name={t("common:price")}
                  keyItem={"price"}
                  isRequired
                  isInvalid={!!errors.price}
                  autoCompleteDisabled
                  type="number"
                />
              </GridItem>
              <GridItem colSpan={{ base: 4, md: 3 }}>
                <InputNumberForm
                  name={t("common:quantity")}
                  keyItem={"quantity"}
                  isRequired
                  isInvalid={!!errors.quantity}
                  withStepper
                  step={1}
                  precision={0}
                  minValue={1}
                  format={(val) => val + ` ${t("common:unitQuantity")}`}
                  parse={(val) => val.replace(` ${t("common:unitQuantity")}`, "")}
                />
              </GridItem>
              <GridItem colSpan={4}>
                <FormControl>
                  <FormLabel>{t("common:amount")}</FormLabel>
                  <Input className={style.chakraInputDisabled} disabled value={calculateAmountPosition()} />
                </FormControl>
              </GridItem>
            </Grid>

            <Grid templateColumns={"repeat(12, 1fr)"} mt="10px">
              <GridItem colSpan={12}>
                <TextareaForm name={t("common:note")} keyItem={`note`} isInvalid={!!errors.note} />
              </GridItem>
            </Grid>
          </Box>
        </form>
      </FormProvider>
    </ModalForm>
  );
};

export default PositionUpdateFormModal;
