import React from "react";
import useTranslation from "next-translate/useTranslation";
import MultiSelectForm, { IMultiselectOption } from "./MultiSelectForm";
import { PositionTypeLocales } from "../../../../../utils/api/types";

interface IPositionTypeMultiselectForm {
  keyItem?: string;
  isRequired?: boolean;
  loading?: boolean;
  skipLabel?: boolean;
  placeholder?: string;
}

const PositionTypeMultiselectForm: React.FC<IPositionTypeMultiselectForm> = ({
  keyItem = "positionTypes",
  isRequired,
  skipLabel = false,
  placeholder = "",
}) => {
  const { t } = useTranslation("common");

  let option: IMultiselectOption[] = [];

  for (const [key, value] of Object.entries(PositionTypeLocales)) {
    option.push({ label: t(`common:${value}`), value: key.toString() });
  }

  return (
    <React.Fragment>
      <MultiSelectForm
        options={option}
        name={!skipLabel ? t("common:positionTypes") : undefined}
        keyItem={keyItem}
        isRequired={isRequired}
        placeholder={placeholder}
      />
    </React.Fragment>
  );
};

export default PositionTypeMultiselectForm;
