import React from "react";
import useTranslation from "next-translate/useTranslation";
import MainLayout from "../../components/layouts/MainLayout";
import { Tabs, Tab, TabList, TabPanels, TabPanel } from "@chakra-ui/react";
import style from "./Settings.module.scss";
import ProfileSettings from "../../components/settings/Profile";
import RepairObjectsSettings from "../../components/settings/RepairObjects";
import ShopsSettings from "../../components/settings/Shops";
import CategoriesSettings from "../../components/settings/Categories";
import RepairObjectSettings from "../../components/settings/ObjectSettings";

const SettingsPage: React.FC = () => {
  const { t } = useTranslation("settings");

  return (
    <MainLayout title={t("common:titleSettings")}>
      <Tabs className={style.tabs} isLazy lazyBehavior="keepMounted">
        <TabList>
          <Tab>{t("profile")}</Tab>
          <Tab>{t("objects")}</Tab>
          <Tab>{t("objectSettings")}</Tab>
          <Tab>{t("shops")}</Tab>
          <Tab>{t("categories")}</Tab>
        </TabList>

        <TabPanels>
          <TabPanel className={style.tabPanels}>
            <ProfileSettings />
          </TabPanel>
          <TabPanel className={style.tabPanels}>
            <RepairObjectsSettings />
          </TabPanel>
          <TabPanel className={style.tabPanels}>
            <RepairObjectSettings />
          </TabPanel>
          <TabPanel className={style.tabPanels}>
            <ShopsSettings />
          </TabPanel>
          <TabPanel className={style.tabPanels}>
            <CategoriesSettings />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </MainLayout>
  );
};

export default SettingsPage;
