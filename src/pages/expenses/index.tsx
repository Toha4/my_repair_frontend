import React from "react";
import useTranslation from "next-translate/useTranslation";
import MainLayout from "../../components/layouts/MainLayout";
import { Box, Button, Flex, Radio, RadioGroup, Spacer, Stack, Text, useDisclosure } from "@chakra-ui/react";
import TableExpensesList from "../../components/expenses/ExpensesView/TableExpensesList";
import TableExpensesCheck from "../../components/expenses/ExpensesView/TableExpensesCheck";
import CheckFormModal from "../../components/expenses/forms/CheckFormModal";

export enum ExpensesViewType {
  LIST = "1",
  CHECK = "2",
}

const ExpensesPage: React.FC = () => {
  const { t } = useTranslation("expenses");

  const [viewType, setViewType] = React.useState<ExpensesViewType>(ExpensesViewType.LIST);

  const { isOpen: isOpenFormCheck, onOpen: onOpenFormCheck, onClose: onCloseFormCheck } = useDisclosure();
  const [idCheckEdit, setIdCheckEdit] = React.useState<number | null>(null);

  const [updateCount, setUpdateCount] = React.useState(0); // state для передачи в useEffect дочерней таблицы для обновлени данных

  const handleAddCkeck = () => {
    setIdCheckEdit(null);
    onOpenFormCheck();
  };

  const handleUpdateTable = () => {
    setUpdateCount((current) => current + 1);
  };

  const handleEditCheck = (id: number) => {
    setIdCheckEdit(id);
    onOpenFormCheck();
  };

  return (
    <MainLayout title={t("titleExpenses")}>
      {isOpenFormCheck && (
        <CheckFormModal
          id={idCheckEdit}
          isOpen={isOpenFormCheck}
          onClose={onCloseFormCheck}
          onUpdateTable={handleUpdateTable}
        />
      )}

      <React.Fragment>
        <Flex
          minWidth="max-content"
          alignItems={{ base: "normal", md: "center" }}
          gap="2"
          direction={{ base: "column", md: "row" }}
          marginBottom="15px"
        >
          <Button variant="brandSolid" onClick={handleAddCkeck}>
            {`${t("common:actionAdd")} ${t("common:check").toLowerCase()}`}
          </Button>
          <Spacer />
          <Box>
            <RadioGroup onChange={(value: ExpensesViewType) => setViewType(value)} value={viewType}>
              <Stack direction="row">
                <Text>{t("radioViewTitle")}:</Text>
                <Radio value={ExpensesViewType.LIST}>{t("radioViewList")}</Radio>
                <Radio value={ExpensesViewType.CHECK}>{t("radioViewCheck")}</Radio>
              </Stack>
            </RadioGroup>
          </Box>
        </Flex>

        {viewType == ExpensesViewType.LIST ? (
          <TableExpensesList onOpenEditCheckDialog={handleEditCheck} updateCount={updateCount}></TableExpensesList>
        ) : (
          <TableExpensesCheck></TableExpensesCheck>
        )}
      </React.Fragment>
    </MainLayout>
  );
};

export default ExpensesPage;
