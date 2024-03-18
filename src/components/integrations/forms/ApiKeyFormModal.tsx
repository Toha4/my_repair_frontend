import React from "react";
import useTranslation from "next-translate/useTranslation";
import { FormProvider, useForm } from "react-hook-form";
import ModalForm from "../../common/ModalForm";
import { yupResolver } from "@hookform/resolvers/yup";
import { ApiKeyFormSchema } from "../validations";
import InputForm from "../../common/forms/elements/InputForm";
import { IModalFormReturned } from "../../common/forms/types";

export interface IFormApiKey {
  api_key: string;
}

const ApiKeyFormModal: React.FC<IModalFormReturned<IFormApiKey>> = ({ isOpen, onClose, onSubmit }) => {
  const { t } = useTranslation("integrations");

  const methodsForm = useForm<IFormApiKey>({
    mode: "onTouched",
    reValidateMode: "onSubmit",
    resolver: yupResolver(ApiKeyFormSchema(t)),
  });

  const handleSubmit = (value: IFormApiKey) => {
    onSubmit(value);
    onClose();
  };

  return (
    <ModalForm
      isOpen={isOpen}
      header={`${t("common:actionAdd")} ${t("proverkaChekaApiKey")}`}
      onClose={onClose}
      okText={t("common:actionAdd")}
      onOk={methodsForm.handleSubmit(handleSubmit)}
    >
      <FormProvider {...methodsForm}>
        <form>
          <InputForm keyItem="api_key" isRequired />
        </form>
      </FormProvider>
    </ModalForm>
  );
};

export default ApiKeyFormModal;
