import React from "react";
import ModalForm from "../../common/ModalForm";
import useTranslation from "next-translate/useTranslation";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { CheckFormSchema } from "./validations";
import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  Grid,
  GridItem,
  IconButton,
  Input,
  Spacer,
  Tooltip,
  useToast,
  Text,
} from "@chakra-ui/react";
import style from "../expenses.module.scss";
import DatepickerForm from "../../common/forms/elements/DatepickerForm";
import ShopSelectForm from "../../common/forms/elements/selects/ShopSelectForm";
import { DeleteIcon } from "../../Icons";
import CopyPositionIcon from "../../Icons/CopyPositionIcon";
import InputForm from "../../common/forms/elements/InputForm";
import InputNumberForm from "../../common/forms/elements/InputNumberForm";
import { formatNumber, stringToDate } from "../../../utils/DataConvert";
import { isCurrentLandMode } from "../../../utils/repairObjects";
import { useAppSelector } from "../../../redux/hooks";
import { OurStore } from "../../../redux/store";
import RoomSelectForm from "../../common/forms/elements/selects/RoomSelectForm";
import CategorySelectForm from "../../common/forms/elements/selects/CategorySelectForm";
import CheckboxIconForm from "../../common/forms/elements/CheckboxIconForm";
import ServiceIcon from "../../Icons/ServiceIcon";
import DeliveryIcon from "../../Icons/DeliveryIcon";
import TextareaForm from "../../common/forms/elements/TextareaForm";
import { useConfirmationModalContext } from "../../../contexts/ModalDialogContext";
import moment from "moment";
import { Api } from "../../../utils/api";
import { CheckType, PositionType } from "../../../utils/api/types";
import { IModalForm } from "../../common/forms/types";

interface IAddCheckModalForm extends IModalForm {
  onUpdateTable(): void;
}

interface IFormCheckPosition {
  pk?: number;
  name: string;
  room: number | undefined;
  category: number | undefined;
  link: string;
  note: string;
  price: number | undefined;
  quantity: number;
  is_service: boolean;
  is_delivery: boolean;
}

interface IFormCheck {
  date: Date | undefined;
  shop: number;
  positions: IFormCheckPosition[];
}

const CheckFormModal: React.FC<IAddCheckModalForm> = ({ id, isOpen, onClose, onUpdateTable }) => {
  const { t } = useTranslation("expenses");
  const { user } = useAppSelector((state: OurStore) => state.authReducer);

  const methodsForm = useForm<IFormCheck>({
    mode: "onTouched",
    reValidateMode: "onSubmit",
    resolver: yupResolver(CheckFormSchema(t)),
  });
  const {
    reset,
    control,
    watch,
    setValue,
    formState: { errors },
  } = methodsForm;
  const { fields, append, remove } = useFieldArray({ name: "positions", control });

  const toast = useToast();
  const modalContext = useConfirmationModalContext();

  const [loading, setLoading] = React.useState<boolean>(false);
  const [submitLoading, setSubmitLoading] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (id) {
      setLoading(true);

      const fetchData = async () => {
        const result = await Api().purchase.getCheck(id);
        reset({
          date: result.date ? stringToDate(result.date) : undefined,
          shop: result.shop,
          positions: result.positions.map((position) => ({
            pk: position.pk,
            name: position.name,
            room: position.room,
            category: position.category,
            link: position.link,
            note: position.note,
            price: position.price,
            quantity: position.quantity,
            is_service: position.type === PositionType.SERVICE,
            is_delivery: position.type === PositionType.DELIVERY,
          })),
        });

        setLoading(false);
      };
      fetchData();
    } else {
      // При добавлении сразу добавляем 1 позицию
      if (methodsForm.getValues("positions").length === 0) {
        handleAddPosition();
      }
    }
  }, []);

  const handleSave = async (value: IFormCheck) => {
    const getType = (is_service: boolean, is_delivery: boolean) => {
      if (is_service) {
        return PositionType.SERVICE;
      } else if (is_delivery) {
        return PositionType.DELIVERY;
      } else {
        return PositionType.PURCHASE;
      }
    };

    const data: CheckType = {
      date: value.date ? moment(value.date).format("YYYY-MM-DD") : "",
      shop: value.shop,
      positions: value.positions.map((position) => ({
        pk: position.pk,
        name: position.name,
        room: position.room,
        category: position.category,
        link: position.link,
        note: position.note,
        price: position.price || 0.0,
        quantity: position.quantity,
        type: getType(position.is_service, position.is_delivery),
      })),
    };

    try {
      setSubmitLoading(true);

      if (id) {
        await Api()
          .purchase.updateCheck(id, data)
          .then((_) => {
            onUpdateTable();
            onClose();
          });
      } else {
        await Api()
          .purchase.createCheck(data)
          .then((_) => {
            onUpdateTable();
            onClose();
          });
      }
    } catch (err) {
      console.warn("Error add or update check", err);
      toast({ title: t("unknownError"), status: "error" });
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleAddPosition = () => {
    addPosition();
  };

  const addPosition = (room: number | undefined = undefined, category: number | undefined = undefined) => {
    append({
      name: "",
      room: room,
      category: category,
      link: "",
      note: "",
      price: undefined,
      quantity: 1,
      is_service: false,
      is_delivery: false,
    });
  };

  const handleRemovePosition = async (index: number) => {
    if (!isEmptyPosition(index)) {
      const resultConfirm = await modalContext.showConfirmation(
        t("common:confirmationTextDeleteWithObject", { name: t("actionPosition"), object: index + 1 })
      );

      if (!resultConfirm) {
        return;
      }
    }

    remove(index);

    if (watch("positions").length === 0) {
      handleAddPosition();
    }
  };

  const handleCopyPosition = (index: number) => {
    const position = watch("positions")[index];
    addPosition(position.room, position.category);
  };

  const isEmptyPosition = (index: number): boolean => {
    const position = watch("positions")[index];
    return (
      !position.name && !position.price && !position.room && !position.category && !position.link && !position.note
    );
  };

  const calculateAmountPosition = (indexPosition: number): string => {
    const price = watch("positions")[indexPosition].price;
    const quantity = watch("positions")[indexPosition].quantity;

    if (!!price && !!quantity) return `${formatNumber(price * quantity)}`;
    return "0.00";
  };

  const calculateTotal = (): string | number => {
    let totalAmount = 0;

    const positions = watch("positions");
    positions?.forEach((position) => {
      if (position.price) {
        totalAmount += position.price * position.quantity;
      }
    });

    return formatNumber(totalAmount);
  };

  return (
    <ModalForm
      isOpen={isOpen}
      header={`${t(id ? "common:actionEdit" : "common:actionAdd")} ${t("common:check").toLowerCase()}`}
      onClose={onClose}
      okText={t(id ? "common:actionSave" : "common:actionAdd")}
      onOk={methodsForm.handleSubmit(handleSave)}
      isLoadingSubmitButton={submitLoading}
      width="80%"
      maxWidth="1000px"
      minWidth="360px"
      additionalFooter={
        <Flex gap={{ base: 1, md: 5 }} flexDirection={{ base: "column", md: "row" }}>
          <Flex gap={1}>
            <Text>{t("totalPositions")}:</Text>
            <Text fontWeight={600}>{watch("positions")?.length}</Text>
          </Flex>
          <Flex gap={1}>
            <Text>{t("totalAmount")}:</Text>
            <Text fontWeight={600}>{calculateTotal()}</Text>
          </Flex>
        </Flex>
      }
    >
      <FormProvider {...methodsForm}>
        <form className={style.settingForm}>
          <Flex width="100%" wrap={{ base: "wrap", md: "nowrap" }} mb=".8rem">
            <Flex gap="10px">
              <Box width="165px" minWidth="106px">
                <DatepickerForm
                  name={t("common:date")}
                  keyItem="date"
                  placeholder={t("common:actionSelectDate")}
                  isRequired
                  loading={loading}
                />
              </Box>
              <Box maxWidth="450px">
                <ShopSelectForm isRequired withAddItem loading={loading}></ShopSelectForm>
              </Box>
            </Flex>
            <Spacer />
            <ButtonGroup gap="5px" ml={{ md: "15px" }} mt={{ base: "10px", md: "36px" }}>
              <Button variant="brandSolid" onClick={handleAddPosition}>
                {`${t("common:actionAdd")} ${t("actionPosition")}`}
              </Button>
              <Button variant="brandOutline">{t("fromPlan")}</Button>
            </ButtonGroup>
          </Flex>

          <Box maxHeight={{ base: "290px", md: "500px" }} overflowY="auto">
            {fields.map((item, i) => (
              <Box className={style.position} key={i}>
                <Flex>
                  <Flex
                    className={style.positionAction}
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Box className={style.positionCount}>{i + 1}</Box>
                    <Tooltip label={`${t("common:actionDelete")} ${t("actionPosition")}`} closeOnScroll>
                      <IconButton
                        className={style.iconActionButton}
                        aria-label={t("common:actionDelete")}
                        variant="iconButton"
                        icon={<DeleteIcon w="24px" h="24px" />}
                        onClick={() => handleRemovePosition(i)}
                      />
                    </Tooltip>
                    <Tooltip label={`${t("common:actionCopy")} ${t("actionPosition")}`} closeOnScroll>
                      <IconButton
                        className={style.iconActionButton}
                        aria-label={t("common:actionCopy")}
                        variant="iconButton"
                        icon={<CopyPositionIcon w="24px" h="24px" />}
                        onClick={() => handleCopyPosition(i)}
                      />
                    </Tooltip>
                  </Flex>

                  <Box width="100%">
                    <Grid
                      templateColumns={{ base: "repeat(12, 1fr)", md: "repeat(24, 1fr)" }}
                      gap="10px"
                      pt="10px"
                      pl="10px"
                    >
                      <GridItem colSpan={{ base: 12, md: 14 }}>
                        <InputForm
                          placeholder={`${t("common:name")} *`}
                          keyItem={`positions.${i}.name`}
                          isRequired
                          loading={loading}
                          isInvalid={!!errors.positions?.[i]?.name}
                        />
                      </GridItem>
                      <GridItem colSpan={{ base: 6, md: 6 }}>
                        <InputForm
                          placeholder={t("common:link")}
                          keyItem={`positions.${i}.link`}
                          loading={loading}
                          isInvalid={!!errors.positions?.[i]?.link}
                          autoCompleteDisabled
                        />
                      </GridItem>
                      <GridItem colSpan={{ base: 3, md: 2 }}>
                        <CheckboxIconForm
                          icon={<ServiceIcon />}
                          keyItem={`positions.${i}.is_service`}
                          tooltipLabel={t("common:service")}
                          loading={loading}
                          onChange={(e) => {
                            if (e.target.checked && watch(`positions.${i}.is_delivery`)) {
                              setValue(`positions.${i}.is_delivery`, false);
                            }
                          }}
                        />
                      </GridItem>
                      <GridItem colSpan={{ base: 3, md: 2 }}>
                        <CheckboxIconForm
                          icon={<DeliveryIcon />}
                          keyItem={`positions.${i}.is_delivery`}
                          tooltipLabel={t("common:delivery")}
                          loading={loading}
                          onChange={(e) => {
                            if (e.target.checked && watch(`positions.${i}.is_delivery`)) {
                              setValue(`positions.${i}.is_service`, false);
                            }
                          }}
                        />
                      </GridItem>
                    </Grid>

                    <Grid
                      templateColumns={{ base: "repeat(12, 1fr)", md: "repeat(24, 1fr)" }}
                      gap="10px"
                      pt="10px"
                      pl="10px"
                      alignItems="center"
                    >
                      <GridItem colSpan={{ base: 7, md: 8 }}>
                        <RoomSelectForm
                          placeholder={
                            isCurrentLandMode(user) ? `${t("common:buildingAndRoom")} *` : `${t("common:room")} *`
                          }
                          keyItem={`positions.${i}.room`}
                          skipLabel
                          isRequired
                          loading={loading}
                          isInvalid={!!errors.positions?.[i]?.room}
                        />
                      </GridItem>
                      <GridItem colSpan={{ base: 5, md: 6 }}>
                        <CategorySelectForm
                          placeholder={`${t("common:category")} *`}
                          keyItem={`positions.${i}.category`}
                          skipLabel
                          isRequired
                          loading={loading}
                          isInvalid={!!errors.positions?.[i]?.category}
                        />
                      </GridItem>
                      <GridItem colSpan={{ base: 4, md: 3 }}>
                        <InputForm
                          placeholder={t(`${t("common:price")} *`)}
                          keyItem={`positions.${i}.price`}
                          isRequired
                          loading={loading}
                          isInvalid={!!errors.positions?.[i]?.price}
                          autoCompleteDisabled
                          type="number"
                        />
                      </GridItem>
                      <GridItem colSpan={{ base: 4, md: 3 }}>
                        <InputNumberForm
                          keyItem={`positions.${i}.quantity`}
                          isRequired
                          loading={loading}
                          isInvalid={!!errors.positions?.[i]?.quantity}
                          withStepper
                          step={1}
                          precision={0}
                          minValue={1}
                          format={(val) => val + ` ${t("common:unitQuantity")}`}
                          parse={(val) => val.replace(` ${t("common:unitQuantity")}`, "")}
                        />
                      </GridItem>
                      <GridItem colSpan={4}>
                        <Input className={style.chakraInputDisabled} disabled value={calculateAmountPosition(i)} />
                      </GridItem>
                    </Grid>

                    <Grid templateColumns={"repeat(12, 1fr)"} gap="10px" pt="10px" pl="10px" pb="10px">
                      <GridItem colSpan={12}>
                        <TextareaForm
                          placeholder={t("common:note")}
                          keyItem={`positions.${i}.note`}
                          loading={loading}
                          isInvalid={!!errors.positions?.[i]?.note}
                        />
                      </GridItem>
                    </Grid>
                  </Box>
                </Flex>
              </Box>
            ))}
          </Box>
        </form>
      </FormProvider>
    </ModalForm>
  );
};

export default CheckFormModal;
