import React from "react";
import useTranslation from "next-translate/useTranslation";
import MainLayout from "../../components/layouts/MainLayout";
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import ProverkaChekaIntegration from "../../components/integrations/ProverkaCheka";
import style from "./Integrations.module.scss";


const IntegrationsPage: React.FC = () => {
  const { t } = useTranslation("integrations");

  return (
    <MainLayout title={t("common:titleIntegrations")}>
      <Tabs isLazy lazyBehavior="keepMounted">
        <TabList>
          <Tab>{t("proverkaChekaName")}</Tab>
          <Tab>Leroy Merlin</Tab>
        </TabList>

        <TabPanels>
          <TabPanel className={style.tabPanels}>
            <ProverkaChekaIntegration />
          </TabPanel>
          <TabPanel className={style.tabPanels}>
            Integration in development
          </TabPanel>
        </TabPanels>
      </Tabs>
    </MainLayout>
  );
};

export default IntegrationsPage;
