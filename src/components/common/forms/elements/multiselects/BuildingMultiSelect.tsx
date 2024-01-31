import React from "react";
import { useAppDispatch, useAppSelector } from "../../../../../redux/hooks";
import { OurStore } from "../../../../../redux/store";
import useTranslation from "next-translate/useTranslation";
import { LoadingStatus } from "../../../../../redux/types";
import { fetchBuildings } from "../../../../../redux/slices/buildingsSlice";
import MultiSelectForm from "./MultiSelectForm";
import { Option } from "chakra-multiselect";

interface IBuildingMultiselectForm {
  keyItem?: string;
  isRequired?: boolean;
  loading?: boolean;
  skipLabel?: boolean;
  placeholder?: string;
}

const BuildingMultiselectForm: React.FC<IBuildingMultiselectForm> = ({
  keyItem = "buildings",
  isRequired,
  loading = false,
  skipLabel = false,
  placeholder = "",
}) => {
  const { t } = useTranslation("common");

  const { buildings, status: buildingsStatus } = useAppSelector((state: OurStore) => state.buildingsReducer);

  const dispatch = useAppDispatch();

  React.useEffect(() => {
    if (buildingsStatus === LoadingStatus.IDLE) {
      dispatch(fetchBuildings());
    }
  }, [buildingsStatus, dispatch]);

  const option: Option[] =
    buildings.length > 0 ? buildings.map((building) => ({ label: building.name, value: building.pk!.toString() })) : [];

  return (
    <React.Fragment>
      <MultiSelectForm
        option={option}
        name={!skipLabel ? t("common:buildings") : undefined}
        keyItem={keyItem}
        isRequired={isRequired}
        placeholder={placeholder}
        loading={loading || buildingsStatus === LoadingStatus.LOADING}
      />
    </React.Fragment>
  );
};

export default BuildingMultiselectForm;
