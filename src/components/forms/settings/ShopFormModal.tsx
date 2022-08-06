import React from "react";
import useTranslation from "next-translate/useTranslation";
import { FormProvider, useForm } from "react-hook-form";
import style from "../form.module.scss";
import ModalForm from "../../common/ModalForm";
import { yupResolver } from "@hookform/resolvers/yup";
import { ShopFormSchema } from "../../../utils/validations";
import InputForm from "../elements/InputForm";
import { Api } from "../../../utils/api";
import { useToast } from "@chakra-ui/react";


interface IFormShop {
  name: string;
  link?: string;
}

const ShopFormModal: React.FC<IModalForm> = ({ id, isOpen, onClose, onUpdateTable }) => {
  const { t } = useTranslation("settings");

  const methodsForm = useForm<IFormShop>({
    mode: "onTouched",
    reValidateMode: "onSubmit",
    resolver: yupResolver(ShopFormSchema(t)),
  });

  const toast = useToast();
  
  const { reset } = methodsForm;

  React.useEffect(() => {
    if (id) {
      const fetchData = async () => {
        const result = await Api().shop.get(id);
        reset({ name: result.name, link: result.link });
      }
      fetchData();
    }
  }, []);

  const handleSave = async (value: IFormShop) => {
    const data = {
      name: value.name,
      link: value.link,
    };

    try {
      if (id) {
        await Api().shop.update(id, data);
        onUpdateTable();
      } else {
        await Api().shop.create(data);
        onUpdateTable();
      }
    } catch (err) {
      console.warn('Error add or update shop', err);
      toast({ title: t("unknownError"), status: "error" });
    } finally {
      onClose();
    }
  };

  return (
    <ModalForm
      isOpen={isOpen}
      header={`${t(id ? "actionEdit" : "actionAdd")} ${t("shop")}`}
      onClose={onClose}
      okText={t(id ? "actionSave" : "actionAdd")}
      onOk={methodsForm.handleSubmit(handleSave)}
    >
      <FormProvider {...methodsForm}>
        <form className={style.settingForm}>
          <InputForm name={t("name")} keyItem="name" isRequired />
          <InputForm name={t("link")} keyItem="link" />
        </form>
      </FormProvider>
    </ModalForm>
  );
};

export default ShopFormModal;
