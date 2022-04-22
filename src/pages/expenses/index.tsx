import React from "react";
import useTranslation from "next-translate/useTranslation";
import MainLayout from "../../components/layout/MainLayout";


const ExpensesPage: React.FC = () => {
  const { t } = useTranslation("common");

  return (
    <MainLayout title={t("titleExpenses")}>
      Heloo

      
      </MainLayout>
  );
};

export default ExpensesPage;
