import React from "react";
import useTranslation from "next-translate/useTranslation";
import MainLayout from "../../components/layout/MainLayout";


const SettingsPage: React.FC = () => {
  const { t } = useTranslation("common");

  return (
    <MainLayout title={t("titleSettings")}>
      Settings in development


    </MainLayout>
  );
};

export default SettingsPage;
