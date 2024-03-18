import React from "react";
import ProverkaChekaIntegrationSettings from "./ProverkaChekaIntegrationSetting";
import { useAppSelector } from "../../../redux/hooks";
import { OurStore } from "../../../redux/store";
import ScanningReceiptsList from "./ScanningReceiptsList";

const ProverkaChekaIntegration: React.FC = () => {
  const { user } = useAppSelector((state: OurStore) => state.authReducer);

  return (
    <React.Fragment>
      <ProverkaChekaIntegrationSettings></ProverkaChekaIntegrationSettings>
      {user?.settings?.is_proverka_cheka_integration && <ScanningReceiptsList></ScanningReceiptsList>}
    </React.Fragment>
  );
};

export default ProverkaChekaIntegration;
