import React from "react";
import SelectForm from "./SelectForm";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { OurStore } from "../../../../redux/store";
import useTranslation from "next-translate/useTranslation";
import { LoadingStatus } from "../../../../redux/types";
import { fetchShops } from "../../../../redux/slices/shopsSlice";
import { useDisclosure } from "@chakra-ui/react";
import ShopFormModal from "../../../settings/forms/ShopFormModal";

interface IShopSelectForm {
  isRequired?: boolean;
  loading?: boolean;
  withAddItem?: boolean;
}

const ShopSelectForm: React.FC<IShopSelectForm> = ({ isRequired, loading = false, withAddItem = false }) => {
  const { t } = useTranslation("common");

  const { isOpen: isOpenForm, onOpen: onOpenForm, onClose: onCloseForm } = useDisclosure();

  const { shops, status: shopsStatus } = useAppSelector((state: OurStore) => state.shopsReducer);

  const dispatch = useAppDispatch();

  React.useEffect(() => {
    if (shopsStatus === LoadingStatus.IDLE) {
      dispatch(fetchShops());
    }
  }, [shopsStatus, dispatch]);

  const handleAddShop = () => {
    onOpenForm();
  }

  return (
    <React.Fragment>
      {isOpenForm && <ShopFormModal id={null} isOpen={isOpenForm} onClose={onCloseForm} />}

      <SelectForm
        name={t("shop")}
        keyItem="shop"
        isRequired={isRequired}
        placeholder=" "
        loading={loading || shopsStatus === LoadingStatus.LOADING}
        onAddItem={withAddItem ? handleAddShop : undefined}
      >
        {shops.map((shop) => (
          <option key={shop.pk} value={shop.pk}>
            {shop.name}
          </option>
        ))}
      </SelectForm>
    </React.Fragment>
  );
};

export default ShopSelectForm;
