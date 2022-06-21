import React from "react";
import useTranslation from "next-translate/useTranslation";
import MainLayout from "../../components/layouts/MainLayout";


const StatisticsPage: React.FC = () => {
  const { t } = useTranslation("common");

  return (
    <MainLayout title={t("titleStatistics")}>
      Statistics in development


    </MainLayout>
  );
};

export default StatisticsPage;
