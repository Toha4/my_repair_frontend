import React from "react";
import useTranslation from "next-translate/useTranslation";
import { FormProvider, useForm } from "react-hook-form";
import style from "../Settings.module.scss";
import ModalForm from "../../common/ModalForm";
import { yupResolver } from "@hookform/resolvers/yup";
import { CategoryFormSchema } from "../../../utils/validations";
import InputForm from "../../common/forms/elements/InputForm";
import { Api } from "../../../utils/api";
import { useToast } from "@chakra-ui/react";
import { useAppDispatch } from "../../../redux/hooks";
import { CategoryItemTypes } from "../../../utils/api/types";
import { categoryAdded, categoryUpdated } from "../../../redux/slices/categorySlice";
import { IModalForm } from "../../common/forms/types";


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

  const toast = useToast();

  const { reset } = methodsForm;

  const [loading, setLoading] = React.useState<boolean>(false);
  const [submitLoading, setSubmitLoading] = React.useState<boolean>(false);

  const dispatch = useAppDispatch();

  React.useEffect(() => {
    if (id) {
      setLoading(true);

      const fetchData = async () => {
        const result = await Api().category.get(id);
        reset({ name: result.name });

        setLoading(false);
      }

      fetchData();
    }
  }, []);

  const handleSave = async (value: IFormCategory) => {
    const data = {
      name: value.name,
    };

    try {
      setSubmitLoading(true);

      if (id) {
        await Api().category.update(id, data).then(
          (category: CategoryItemTypes) => {
            dispatch(categoryUpdated(category));
            setSubmitLoading(false);
          }
        );
      } else {
        await Api().category.create(data).then(
          (category: CategoryItemTypes) => {
            dispatch(categoryAdded(category));
            setSubmitLoading(false);
          }
        );
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
      header={`${t(id ? "common:actionEdit" : "common:actionAdd")} ${t("category")}`}
      onClose={onClose}
      okText={t(id ? "common:actionSave" : "common:actionAdd")}
      onOk={methodsForm.handleSubmit(handleSave)}
      isLoadingSubmitButton={submitLoading}
    >
      <FormProvider {...methodsForm}>
        <form className={style.settingForm}>
          <InputForm name={t("common:name")} keyItem="name" isRequired loading={loading}/>
        </form>
      </FormProvider>
    </ModalForm>
  );
};

export default CategoryFormModal;
