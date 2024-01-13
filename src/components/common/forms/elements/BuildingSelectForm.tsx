import React from "react";
import SelectForm from "./SelectForm";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { OurStore } from "../../../../redux/store";
import useTranslation from "next-translate/useTranslation";
import { LoadingStatus } from "../../../../redux/types";
import { fetchBuildings } from "../../../../redux/slices/buildingsSlice";

interface IBuildingSelectForm {
  isRequired?: boolean;
  loading?: boolean;
}

const BuildingSelectForm: React.FC<IBuildingSelectForm> = ({ isRequired, loading = false }) => {
  const { t } = useTranslation("settings");

  const { buildings, status: buildingsStatus } = useAppSelector((state: OurStore) => state.buildingsReducer);

  const dispatch = useAppDispatch();

  React.useEffect(() => {
    if (buildingsStatus === LoadingStatus.IDLE) {
      dispatch(fetchBuildings());
    }
  }, [buildingsStatus, dispatch]);

  return (
    <SelectForm
      name={t("common:building")}
      keyItem="building"
      isRequired={isRequired}
      placeholder=" "
      loading={loading || buildingsStatus === LoadingStatus.LOADING}
    >
      {buildings.map((building) => (
        <option key={building.pk} value={building.pk}>
          {building.name}
        </option>
      ))}
    </SelectForm>
  );
};

export default BuildingSelectForm;
