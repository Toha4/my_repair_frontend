import React from "react";
import useTranslation from "next-translate/useTranslation";
import MainLayout from "../../components/layouts/MainLayout";


const PlansPage: React.FC = () => {
  const { t } = useTranslation("common");

  return (
    <MainLayout title={t("titlePlans")}>
      Plans in development


    </MainLayout>
  );
};

export default PlansPage;
