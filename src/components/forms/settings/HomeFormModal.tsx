import React from "react";
import useTranslation from "next-translate/useTranslation";
import { FormProvider, useForm } from "react-hook-form";
import ModalForm from "../../common/ModalForm";

import { yupResolver } from "@hookform/resolvers/yup";
import { HomeFormSchema } from "../../../utils/validations";
import InputForm from "../elements/InputForm";
import InputNumberForm from "../elements/InputNumberForm";
import SelectForm from "../elements/SelectForm";
import { HomeTypesNames } from "../../../constants/home";
import { capitalizeFirstLetter } from "../../../utils/DataConvert";

interface IModalForm {
  id: number | null;
  isOpen: boolean;
  onClose(): void;
}

interface IFormHome {
  name: string;
  type: number;
  square?: number;
}

const HomeFormModal: React.FC<IModalForm> = ({ id, isOpen, onClose }) => {
  const { t } = useTranslation("settings");

  React.useEffect(() => {
    if (id) {
      console.log(`Loading home [${id}]`);
    }
  }, []);

  const methodsForm = useForm<IFormHome>({
    mode: "onTouched",
    reValidateMode: "onSubmit",
    resolver: yupResolver(HomeFormSchema(t)),
  });

  const handleSave = (value: IFormHome) => {
    if (id) {
      console.log("Save home: ", value);
    } else {
      console.log("Add home: ", value);
    }

    onClose();
  };

  return (
    <ModalForm
      isOpen={isOpen}
      header={`${t(id ? "actionEdit" : "actionAdd")} ${t("home")}`}
      onClose={onClose}
      okText={t(id ? "actionSave" : "actionAdd")}
      onOk={methodsForm.handleSubmit(handleSave)}
    >
      <FormProvider {...methodsForm}>
        <form>
          <InputForm name={t("name")} keyItem="name" isRequired />
          <SelectForm
            name={t("type")}
            keyItem="type"
            isRequired
            placeholder=" "
          >
            {Object.entries(HomeTypesNames).map(([key, value]) => (
              <option key={key} value={key}>{capitalizeFirstLetter(t(value))}</option>
            ))}
          </SelectForm>
          <InputNumberForm name={t("square")} keyItem="square" />
        </form>
      </FormProvider>
    </ModalForm>
  );
};

export default HomeFormModal;
