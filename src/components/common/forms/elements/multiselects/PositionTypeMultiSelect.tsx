import React from "react";
import useTranslation from "next-translate/useTranslation";
import MultiSelectForm from "./MultiSelectForm";
import { Option } from "chakra-multiselect";
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

  let option: Option[] = [];

  for (const [key, value] of Object.entries(PositionTypeLocales)) {
    option.push({ label: t(`common:${value}`), value: key.toString() });
  }

  return (
    <React.Fragment>
      <MultiSelectForm
        option={option}
        name={!skipLabel ? t("common:positionTypes") : undefined}
        keyItem={keyItem}
        isRequired={isRequired}
        placeholder={placeholder}
      />
    </React.Fragment>
  );
};

export default PositionTypeMultiselectForm;
