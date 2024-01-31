import React from "react";
import SelectForm from "./SelectForm";
import { useAppDispatch, useAppSelector } from "../../../../../redux/hooks";
import { OurStore } from "../../../../../redux/store";
import useTranslation from "next-translate/useTranslation";
import { LoadingStatus } from "../../../../../redux/types";
import { fetchCategories } from "../../../../../redux/slices/categorySlice";

interface ICategorySelectForm {
  isRequired?: boolean;
  loading?: boolean;
  skipLabel?: boolean;
  keyItem?: string;
  placeholder?: string;
  isInvalid?: boolean;
}

const CategorySelectForm: React.FC<ICategorySelectForm> = ({
  isRequired,
  loading = false,
  skipLabel = false,
  keyItem = "category",
  placeholder = " ",
  isInvalid,
}) => {
  const { t } = useTranslation("settings");

  const { categories, status: categoryStatus } = useAppSelector((state: OurStore) => state.categoriesReducer);

  const dispatch = useAppDispatch();

  React.useEffect(() => {
    if (categoryStatus === LoadingStatus.IDLE) {
      dispatch(fetchCategories());
    }
  }, [categoryStatus, dispatch]);

  return (
    <SelectForm
      name={!skipLabel ? t("common:category") : undefined}
      keyItem={keyItem}
      isRequired={isRequired}
      placeholder={placeholder}
      loading={loading || categoryStatus === LoadingStatus.LOADING}
      isInvalid={isInvalid}
    >
      {categories.map((category) => (
        <option key={category.pk} value={category.pk}>
          {category.name}
        </option>
      ))}
    </SelectForm>
  );
};

export default CategorySelectForm;
