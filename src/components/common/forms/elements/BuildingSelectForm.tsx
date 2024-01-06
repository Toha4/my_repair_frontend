import React from "react";
import SelectForm from "./SelectForm";
import { useAppSelector } from "../../../../redux/hooks";
import { OurStore } from "../../../../redux/store";
import useTranslation from "next-translate/useTranslation";

interface IBuildingSelectForm {
  isRequired?: boolean;
  loading?: boolean;
}

const BuildingSelectForm: React.FC<IBuildingSelectForm> = ({ isRequired, loading = false }) => {
  const { t } = useTranslation("settings");

  const { buildings, status: buildingsStatus } = useAppSelector((state: OurStore) => state.buildingsReducer);

  return (
    <SelectForm name={t("building")} keyItem="building" isRequired={isRequired} placeholder=" " loading={loading}>
      {buildings.map((building) => (
        <option key={building.pk} value={building.pk}>
          {building.name}
        </option>
      ))}
    </SelectForm>
  );
};

export default BuildingSelectForm;
