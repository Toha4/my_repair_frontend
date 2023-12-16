import React, { Fragment } from "react";
import useTranslation from "next-translate/useTranslation";
import RoomsSettings from "./Rooms";
import { Box, Heading, Text } from "@chakra-ui/react";
import style from "../Settings.module.scss";
import BuildingsSettings from "./Buildings";
import { useAppSelector } from "../../../redux/hooks";
import { OurStore } from "../../../redux/store";
import { isCurrentLandMode } from "../../../utils/repairObjects";


const RepairObjectSettings: React.FC = () => {
  const { t, lang } = useTranslation("settings");
  const { user } = useAppSelector((state: OurStore) => state.authReducer);

  return (
    <>
    <Box className={style.settingBox}>
      <Text>{t("noteObjectSettings", { name: user?.settings?.current_repair_object_name })}</Text>

      {isCurrentLandMode(user) && <Fragment>
        <Heading as='h4' size='md' className={style.headerRepairObjectSettings}>{t("buildings")}</Heading>      
        <BuildingsSettings></BuildingsSettings>
      </Fragment>}

      <Heading as='h4' size='md' className={style.headerRepairObjectSettings}>{t("rooms")}</Heading>      
      <RoomsSettings></RoomsSettings>
    </Box>
    </>
  );
}

export default RepairObjectSettings;