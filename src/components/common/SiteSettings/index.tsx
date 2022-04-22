import React from "react";
import style from "./SiteSettings.module.scss";
import LanguageSwitch from "./LanguageSwitch";
import ColorModeSwitch from "./ColorModeSwitch";

interface ISiteSettings {
  hideLanguageSwitch?: boolean,
}

const SiteSettings: React.FC<ISiteSettings> = ({ hideLanguageSwitch }) => {
  return (
    <div className={style.siteSettongs}>
      <ColorModeSwitch />
      {!hideLanguageSwitch && <LanguageSwitch />}
    </div>
  );
}

export default SiteSettings;