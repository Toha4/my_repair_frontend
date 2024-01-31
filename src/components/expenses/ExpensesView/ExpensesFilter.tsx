import React from "react";
import style from "../expenses.module.scss";

import { ITableParams } from "../../../types/types";
import { Box, Button, Center, Flex, IconButton, InputGroup, InputRightElement, Text } from "@chakra-ui/react";
import { FormProvider, useForm } from "react-hook-form";
import InputForm from "../../common/forms/elements/InputForm";
import useTranslation from "next-translate/useTranslation";
import { DeleteIcon, FilterIcon } from "../../Icons";
import { SearchIcon } from "@chakra-ui/icons";
import DatepickerForm from "../../common/forms/elements/DatepickerForm";
import moment from "moment";
import ShopMultiselectForm from "../../common/forms/elements/multiselects/ShopMultiSelectForm";
import { Option } from "chakra-multiselect";
import RoomMultiselectForm from "../../common/forms/elements/multiselects/RoomMultiSelect";
import BuildingMultiselectForm from "../../common/forms/elements/multiselects/BuildingMultiSelect";
import { useAppSelector } from "../../../redux/hooks";
import { OurStore } from "../../../redux/store";
import { isCurrentLandMode } from "../../../utils/repairObjects";
import CategoryMultiselectForm from "../../common/forms/elements/multiselects/CategoryMultiSelect";
import PositionTypeMultiselectForm from "../../common/forms/elements/multiselects/PositionTypeMultiSelect";

interface IExpensesFilter {
  tableParams: ITableParams;
  setTableParams: React.Dispatch<React.SetStateAction<ITableParams>>;
}

export enum FilterMode {
  SEARCH = 1,
  FILTER = 2,
}

interface IFormFilter {
  generalSearch: string;
  dateBegin: Date | null;
  dateEnd: Date | null;
  shops: Option[];
  buildings: Option[];
  rooms: Option[];
  categories: Option[];
  positionTypes: Option[];
}

const ExpensesFilter: React.FC<IExpensesFilter> = ({ tableParams, setTableParams }) => {
  const { t } = useTranslation("expenses");
  const { user } = useAppSelector((state: OurStore) => state.authReducer);

  const [mode, setMode] = React.useState<FilterMode>(FilterMode.SEARCH);
  const [hasFilters, setHasFilters] = React.useState<boolean>(false);

  const methodsForm = useForm<IFormFilter>({ mode: "onTouched" });

  const { reset, control, watch, setValue, handleSubmit } = methodsForm;

  const clearGeneralSearch = () => {
    setValue("generalSearch", "");
    handleSubmit(handleSetFilter)();
  };

  const resetFilters = () => {
    reset({
      generalSearch: "",
      dateBegin: null,
      dateEnd: null,
      shops: [],
      buildings: [],
      rooms: [],
      categories: [],
      positionTypes: [],
    });

    handleSubmit(handleSetFilter)();
  };

  const handleSetFilter = (value: IFormFilter) => {
    if (hasFormData(value)) {
      setHasFilters(true);
    } else {
      setHasFilters(false);
    }

    setTableParams({
      ...tableParams,
      filters: {
        general_search: value.generalSearch?.length > 0 ? value.generalSearch : undefined,
        date_begin: value.dateBegin ? moment(value.dateBegin).format("DD.MM.YYYY") : undefined,
        date_end: value.dateEnd ? moment(value.dateEnd).format("DD.MM.YYYY") : undefined,
        shops: value.shops?.length > 0 ? value.shops.map((item) => Number(item.value)).toString() : undefined,
        rooms: value.rooms?.length > 0 ? value.rooms.map((item) => Number(item.value)).toString() : undefined,
        buildings:
          value.buildings?.length > 0 ? value.buildings.map((item) => Number(item.value)).toString() : undefined,
        categories:
          value.categories?.length > 0 ? value.categories.map((item) => Number(item.value)).toString() : undefined,
        position_types:
          value.positionTypes?.length > 0
            ? value.positionTypes.map((item) => Number(item.value)).toString()
            : undefined,
      },
    });
  };

  const hasFormData = (value: IFormFilter) => {
    console.log(value.dateEnd);
    return (
      !!value.dateBegin ||
      !!value.dateEnd ||
      !!value.shops?.length ||
      !!value.rooms?.length ||
      !!value.buildings?.length ||
      !!value.categories?.length ||
      !!value.positionTypes?.length
    );
  };

  const handleChangeMode = () => {
    setMode((prevState) => {
      return prevState == FilterMode.SEARCH ? FilterMode.FILTER : FilterMode.SEARCH;
    });
  };

  return (
    <Box className={style.expensesFilterBlock}>
      <FormProvider {...methodsForm}>
        <form onSubmit={handleSubmit(handleSetFilter)}>
          {/* Режим поиска */}
          {mode === FilterMode.SEARCH && (
            <Flex gap=".75rem" margin=".75rem">
              <InputGroup>
                <InputForm placeholder={t("common:search")} keyItem="generalSearch" autoCompleteDisabled />
                {watch("generalSearch")?.length > 0 && (
                  <InputRightElement>
                    <IconButton
                      className={style.iconActionButton}
                      aria-label={t("common:actionDelete")}
                      variant="iconButton"
                      icon={<DeleteIcon w="24px" h="24px" />}
                      onClick={() => clearGeneralSearch()}
                    />
                  </InputRightElement>
                )}
              </InputGroup>
              <IconButton type="submit" variant="brandSolid" aria-label="Search" minW="60px" icon={<SearchIcon />} />
            </Flex>
          )}
          {/* Режим фильра */}
          {mode === FilterMode.FILTER && (
            <Box margin=".75rem">
              <Flex gap=".75rem" wrap="wrap">
                <Box flex="1" minWidth="180px">
                  <InputForm placeholder={t("common:search")} keyItem="generalSearch" />
                </Box>

                <Box width="150px" minWidth="120px">
                  <DatepickerForm keyItem="dateBegin" placeholder={t("common:dateFrom")} />
                </Box>
                <Box width="150px" minWidth="120px">
                  <DatepickerForm keyItem="dateEnd" placeholder={t("common:dateBy")} />
                </Box>
                <Box>
                  <ShopMultiselectForm skipLabel placeholder={t("common:shops")} />
                </Box>
                {isCurrentLandMode(user) && (
                  <Box>
                    <BuildingMultiselectForm skipLabel placeholder={t("common:buildings")} />
                  </Box>
                )}
                <Box>
                  <RoomMultiselectForm skipLabel placeholder={t("common:rooms")} />
                </Box>
                <Box>
                  <CategoryMultiselectForm skipLabel placeholder={t("common:categories")} />
                </Box>
                <Box>
                  <PositionTypeMultiselectForm skipLabel placeholder={t("common:positionTypes")} />
                </Box>
              </Flex>
              <Flex marginTop=".75rem" gap=".75rem">
                <Button type="submit" variant="brandSolid">
                  {t("common:apply")}
                </Button>
                <Button variant="brandOutline" onClick={() => resetFilters()}>
                  {t("common:reset")}
                </Button>
              </Flex>
            </Box>
          )}
          <Box className={style.expensesFilterChengeModeBlock} onClick={handleChangeMode}>
            <Center>
              {hasFilters && (
                <Box marginBottom="-8px">
                  <FilterIcon w="24px" h="24px" />
                </Box>
              )}
              <Text fontSize="sm" fontWeight={hasFilters ? "900" : "400"}>
                {mode === FilterMode.SEARCH
                  ? `${t("common:filters")} ↓`
                  : `${t("common:hide")} ${t("common:filters").toLowerCase()} ↑`}
              </Text>
            </Center>
          </Box>
        </form>
      </FormProvider>
    </Box>
  );
};

export default ExpensesFilter;
