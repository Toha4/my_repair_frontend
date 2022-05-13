import React from "react";
import useTranslation from "next-translate/useTranslation";
import { FormProvider, useForm } from "react-hook-form";
import style from "../form.module.scss";
import ModalForm from "../../common/ModalForm";
import { yupResolver } from "@hookform/resolvers/yup";
import { ShopFormSchema } from "../../../utils/validations";
import InputForm from "../elements/InputForm";


interface IFormShop {
  name: string;
  link?: string;
}

const ShopFormModal: React.FC<IModalForm> = ({ id, isOpen, onClose }) => {
  const { t } = useTranslation("settings");

  const methodsForm = useForm<IFormShop>({
    mode: "onTouched",
    reValidateMode: "onSubmit",
    resolver: yupResolver(ShopFormSchema(t)),
  });

  const { reset } = methodsForm;

  React.useEffect(() => {
    if (id) {
      console.log(`Loading shop [${id}]`);
      // Simulated loading
      setTimeout(() => {
        const test_data = { name: "AliExpress", link: "https://ru.aliexpress.com" }
        reset(test_data);
      }, 100)
    }
  }, []);

  const handleSave = (value: IFormShop) => {
    const data = {
      name: value.name,
      link: value.link,
    };

    if (id) {
      console.log("Save shop: ", data);
    } else {
      console.log("Add shop: ", data);
    }

    onClose();
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
