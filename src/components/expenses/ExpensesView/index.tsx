import React from "react";
import { ExpensesViewType } from "../../../pages/expenses";
import { Box } from "@chakra-ui/react";
import TableExpensesList from "./TableExpensesList";
import TableExpensesCheck from "./TableExpensesCheck";

interface IExpensesView {
  typeView: ExpensesViewType;
}

const ExpensesView: React.FC<IExpensesView> = ({ typeView }) => {



  return (
    <React.Fragment>
      <Box style={{background: '#EDF2F7', height: '50px', marginBottom: '1.25rem'}}>Filter block</Box>

      {typeView == ExpensesViewType.LIST 
      ? <TableExpensesList></TableExpensesList> 
      : <TableExpensesCheck></TableExpensesCheck>}
    </React.Fragment>
  );
};

export default ExpensesView;