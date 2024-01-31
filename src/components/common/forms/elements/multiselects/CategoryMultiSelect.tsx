import React from "react";
import { useAppDispatch, useAppSelector } from "../../../../../redux/hooks";
import { OurStore } from "../../../../../redux/store";
import useTranslation from "next-translate/useTranslation";
import { LoadingStatus } from "../../../../../redux/types";
import { fetchCategories } from "../../../../../redux/slices/categorySlice";
import MultiSelectForm from "./MultiSelectForm";
import { Option } from "chakra-multiselect";

interface ICategoryMultiselectForm {
  keyItem?: string;
  isRequired?: boolean;
  loading?: boolean;
  skipLabel?: boolean;
  placeholder?: string;
}

const CategoryMultiselectForm: React.FC<ICategoryMultiselectForm> = ({
  keyItem = "categories",
  isRequired,
  loading = false,
  skipLabel = false,
  placeholder = "",
}) => {
  const { t } = useTranslation("common");

  const { categories, status: categoriesStatus } = useAppSelector((state: OurStore) => state.categoriesReducer);

  const dispatch = useAppDispatch();

  React.useEffect(() => {
    if (categoriesStatus === LoadingStatus.IDLE) {
      dispatch(fetchCategories());
    }
  }, [categoriesStatus, dispatch]);

  const option: Option[] =
    categories.length > 0 ? categories.map((category) => ({ label: category.name, value: category.pk!.toString() })) : [];

  return (
    <React.Fragment>
      <MultiSelectForm
        option={option}
        name={!skipLabel ? t("common:categories") : undefined}
        keyItem={keyItem}
        isRequired={isRequired}
        placeholder={placeholder}
        loading={loading || categoriesStatus === LoadingStatus.LOADING}
      />
    </React.Fragment>
  );
};

export default CategoryMultiselectForm;
