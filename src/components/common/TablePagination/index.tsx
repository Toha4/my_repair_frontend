import React from "react";
import {
  Flex,
  IconButton,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
  Tooltip,
  useColorMode,
} from "@chakra-ui/react";
import { ArrowLeftIcon, ArrowRightIcon, ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { Updater } from "@tanstack/react-table";
import useTranslation from "next-translate/useTranslation";

export interface ITablePagination {
  currentPageSize: number;
  currentPageIndex: number;
  pageCount: number;
  setPageSize: (updater: Updater<number>) => void;
  setPageIndex: (updater: Updater<number>) => void;
  previousPage: () => void;
  nextPage: () => void;
  canPreviousPage: boolean;
  canNextPage: boolean;
}

const PAGE_SIZES = [10, 20, 50, 100];

const TablePagination: React.FC<ITablePagination> = ({
  currentPageSize,
  currentPageIndex,
  pageCount,
  setPageSize,
  setPageIndex,
  previousPage,
  nextPage,
  canPreviousPage,
  canNextPage,
}) => {
  const { colorMode } = useColorMode();
  const { t } = useTranslation("common");

  return (
    <Flex justifyContent="space-between" mt="10px" mb="10px" alignItems="center" flexWrap="wrap">
      <Flex>
        <Select
          minWidth="140px"
          value={currentPageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
            setPageIndex(0);
          }}
          borderColor={colorMode == "dark" ? "whiteAlpha.300" : "gray.200"}
        >
          {PAGE_SIZES.map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              {t("paginationShow")} {pageSize}
            </option>
          ))}
        </Select>
      </Flex>

      <Flex alignItems="center">
        <Flex mr={4} alignItems="center" gap={2}>
          {t("paginationGoToPage")}:
          <NumberInput
            width="70px"
            minW="70px"
            defaultValue={currentPageIndex + 1}
            min={1}
            max={pageCount}
            onChange={(value) => {
              const page = value ? Number(value) - 1 : 0;
              setPageIndex(page);
            }}
          >
            <NumberInputField borderColor={colorMode == "dark" ? "whiteAlpha.300" : "gray.200"} />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </Flex>
      </Flex>

      <Flex>
        <Tooltip label={t("paginationNavigatePage", { navigate: t("paginationFirst") })}>
          <IconButton
            aria-label="First Page"
            onClick={() => setPageIndex(0)}
            isDisabled={!canPreviousPage}
            icon={<ArrowLeftIcon h={3} w={3} />}
            mr={4}
          />
        </Tooltip>
        <Tooltip label={t("paginationNavigatePage", { navigate: t("paginationPrevious") })}>
          <IconButton
            aria-label="Previous Page"
            onClick={() => previousPage()}
            isDisabled={!canPreviousPage}
            icon={<ChevronLeftIcon h={6} w={6} />}
            mr={4}
          />
        </Tooltip>
        <Flex mr={4} alignItems="center" gap={1} wrap="nowrap">
          <div>{t("paginationPage")}</div>
          <strong style={{ whiteSpace: "nowrap" }}>
            {currentPageIndex + 1} {t("paginationOf")} {pageCount}
          </strong>
        </Flex>
        <Tooltip label={t("paginationNavigatePage", { navigate: t("paginationNext") })}>
          <IconButton
            aria-label="Next Page"
            onClick={() => nextPage()}
            isDisabled={!canNextPage}
            icon={<ChevronRightIcon h={6} w={6} />}
          />
        </Tooltip>
        <Tooltip label={t("paginationNavigatePage", { navigate: t("paginationLast") })}>
          <IconButton
            aria-label="Last Page"
            onClick={() => setPageIndex(pageCount - 1)}
            isDisabled={!canNextPage}
            icon={<ArrowRightIcon h={3} w={3} />}
            ml={4}
          />
        </Tooltip>
      </Flex>
    </Flex>
  );
};

export default TablePagination;
