import React from "react";
import { useAppDispatch, useAppSelector } from "../../../../../redux/hooks";
import { OurStore } from "../../../../../redux/store";
import useTranslation from "next-translate/useTranslation";
import { LoadingStatus } from "../../../../../redux/types";
import { fetchShops } from "../../../../../redux/slices/shopsSlice";
import MultiSelectForm from "./MultiSelectForm";
import { Option } from "chakra-multiselect";

interface IShopMultiselectForm {
  keyItem?: string;
  isRequired?: boolean;
  loading?: boolean;
  skipLabel?: boolean;
  placeholder?: string;
}

const ShopMultiselectForm: React.FC<IShopMultiselectForm> = ({
  keyItem = "shops",
  isRequired,
  loading = false,
  skipLabel = false,
  placeholder = "",
}) => {
  const { t } = useTranslation("common");

  const { shops, status: shopsStatus } = useAppSelector((state: OurStore) => state.shopsReducer);

  const dispatch = useAppDispatch();

  React.useEffect(() => {
    if (shopsStatus === LoadingStatus.IDLE) {
      dispatch(fetchShops());
    }
  }, [shopsStatus, dispatch]);

  const option: Option[] =
    shops.length > 0 ? shops.map((shop) => ({ label: shop.name, value: shop.pk!.toString() })) : [];

  return (
    <React.Fragment>
      <MultiSelectForm
        option={option}
        name={!skipLabel ? t("common:shops") : undefined}
        keyItem={keyItem}
        isRequired={isRequired}
        placeholder={placeholder}
        loading={loading || shopsStatus === LoadingStatus.LOADING}
      />
    </React.Fragment>
  );
};

export default ShopMultiselectForm;
