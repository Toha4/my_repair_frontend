import React from "react";
import useTranslation from "next-translate/useTranslation";
import MainLayout from "../../components/layouts/MainLayout";
import { Box, Button, Flex, Radio, RadioGroup, Spacer, Stack, Text } from "@chakra-ui/react";
import ExpensesView from "../../components/expenses/ExpensesView";

export enum ExpensesViewType {
  LIST = '1',
  CHECK = '2'
};


const ExpensesPage: React.FC = () => {
  const { t } = useTranslation("expenses");

  const [viewType, setViewType] = React.useState<ExpensesViewType>(ExpensesViewType.LIST);

  const handleAddCkeck = () => {
    console.log('Add check!')
  }

  return (
    <MainLayout title={t("titleExpenses")}>
      <React.Fragment>
        <Flex 
          minWidth='max-content' 
          alignItems={{ base: 'normal', md: 'center' }} 
          gap='2' 
          direction={{ base: 'column', md: 'row' }} 
          style={{marginBottom: '1.25rem'}}
        >
          <Button variant="brandSolid" onClick={handleAddCkeck}>{t("buttonAddCkeck")}</Button>
          <Spacer />
          <Box>
            <RadioGroup onChange={(value: ExpensesViewType) => setViewType(value)} value={viewType}>
              <Stack direction='row'>
                <Text>{t("radioViewTitle")}:</Text>
                <Radio value={ExpensesViewType.LIST}>{t("radioViewList")}</Radio>
                <Radio value={ExpensesViewType.CHECK}>{t("radioViewCheck")}</Radio>
              </Stack>
            </RadioGroup>
          </Box>
        </Flex>

        <ExpensesView typeView={viewType}/>
        
      </React.Fragment>      
    </MainLayout>
  );
};

export default ExpensesPage;
