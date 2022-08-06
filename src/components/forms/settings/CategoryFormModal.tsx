import React from "react";
import useTranslation from "next-translate/useTranslation";
import { FormProvider, useForm } from "react-hook-form";
import style from "../form.module.scss";
import ModalForm from "../../common/ModalForm";
import { yupResolver } from "@hookform/resolvers/yup";
import { CategoryFormSchema } from "../../../utils/validations";
import InputForm from "../elements/InputForm";
import { Api } from "../../../utils/api";
import { useToast } from "@chakra-ui/react";


interface IFormCategory {
  name: string;
}

const CategoryFormModal: React.FC<IModalForm> = ({ id, isOpen, onClose, onUpdateTable }) => {
  const { t } = useTranslation("settings");

  const methodsForm = useForm<IFormCategory>({
    mode: "onTouched",
    reValidateMode: "onSubmit",
    resolver: yupResolver(CategoryFormSchema(t)),
  });

  const toast = useToast();

  const { reset } = methodsForm;

  React.useEffect(() => {
    if (id) {
      const fetchData = async () => {
        const result = await Api().category.get(id);
        reset({ name: result.name });
      }
      fetchData();
    }
  }, []);

  const handleSave = async (value: IFormCategory) => {
    const data = {
      name: value.name,
    };

    try {
      if (id) {
        await Api().category.update(id, data);
        onUpdateTable();
      } else {
        await Api().category.create(data);
        onUpdateTable();
      }
    } catch (err) {
      console.warn('Error add or update category', err);
      toast({ title: t("unknownError"), status: "error" });
    } finally {
      onClose();
    }
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
