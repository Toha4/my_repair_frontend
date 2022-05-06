import React from "react";
import useTranslation from "next-translate/useTranslation";
import { FormProvider, useForm } from "react-hook-form";
import style from "../form.module.scss";
import ModalForm from "../../common/ModalForm";
import { yupResolver } from "@hookform/resolvers/yup";
import { CategoryFormSchema } from "../../../utils/validations";
import InputForm from "../elements/InputForm";


interface IFormCategory {
  name: string;
}

const CategoryFormModal: React.FC<IModalForm> = ({ id, isOpen, onClose }) => {
  const { t } = useTranslation("settings");

  const methodsForm = useForm<IFormCategory>({
    mode: "onTouched",
    reValidateMode: "onSubmit",
    resolver: yupResolver(CategoryFormSchema(t)),
  });

  const { reset } = methodsForm;

  React.useEffect(() => {
    if (id) {
      console.log(`Loading category [${id}]`);
      // Simulated loading
      setTimeout(() => {
        const test_data = { name: "Потолок" }
        reset(test_data);
      }, 100)
    }
  }, []);

  const handleSave = (value: IFormCategory) => {
    const data = {
      name: value.name,
    };

    if (id) {
      console.log("Save category: ", data);
    } else {
      console.log("Add category: ", data);
    }

    onClose();
  };

  return (
    <ModalForm
      isOpen={isOpen}
      header={`${t(id ? "actionEdit" : "actionAdd")} ${t("category")}`}
      onClose={onClose}
      okText={t(id ? "actionSave" : "actionAdd")}
      onOk={methodsForm.handleSubmit(handleSave)}
    >
      <FormProvider {...methodsForm}>
        <form className={style.settingForm}>
          <InputForm name={t("name")} keyItem="name" isRequired />
        </form>
      </FormProvider>
    </ModalForm>
  );
};

export default CategoryFormModal;
