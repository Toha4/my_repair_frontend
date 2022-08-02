import React from "react";
import useTranslation from "next-translate/useTranslation";
import MainLayout from "../../components/layouts/MainLayout";
import { Tabs, Tab, TabList, TabPanels, TabPanel } from "@chakra-ui/react";
import style from "./Settings.module.scss";
import ProfileSettings from "../../components/settings/Profile";
import HomesSettings from "../../components/settings/Homes";
import RoomsSettings from "../../components/settings/Rooms";
import ShopsSettings from "../../components/settings/Shops";
import CategoriesSettings from "../../components/settings/Categories";

const SettingsPage: React.FC = () => {
  const { t } = useTranslation("settings");

  return (
    <MainLayout title={t("common:titleSettings")}>
      <Tabs className={style.tabs} isLazy lazyBehavior="keepMounted">
        <TabList>
          <Tab>{t("profile")}</Tab>
          <Tab>{t("homes")}</Tab>
          <Tab>{t("rooms")}</Tab>
          <Tab>{t("shops")}</Tab>
          <Tab>{t("сategories")}</Tab>
        </TabList>

        <TabPanels>
          <TabPanel className={style.tabPanels}>
            <ProfileSettings />
          </TabPanel>
          <TabPanel className={style.tabPanels}>
            <HomesSettings />
          </TabPanel>
          <TabPanel className={style.tabPanels}>
            <RoomsSettings />
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
