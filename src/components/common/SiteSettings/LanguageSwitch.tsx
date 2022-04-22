import React from "react";
import useTranslation from "next-translate/useTranslation";
import setLanguage from "next-translate/setLanguage";
import { Box, HStack, useRadio, useRadioGroup, useStyleConfig } from "@chakra-ui/react";
import style from "./SiteSettings.module.scss";

function RadioCard(props: any) {
  const styles = useStyleConfig('RadioCard', { variant: props.variant })

  const { getInputProps, getCheckboxProps } = useRadio(props);

  const input = getInputProps();
  const checkbox = getCheckboxProps();

  return (
    <Box as="label">
      <input {...input} />
      <Box {...checkbox} __css={styles} className={style.buttonSwitch}>
        {props.children}
      </Box>
    </Box>
  );
}

const LanguageSwitch: React.FC = () => {
  const { lang } = useTranslation();
  const options = ["eng", "рус"];

  const onChange = async (e: any) => {
    await setLanguage(e === "eng" ? "en" : "ru");
  };

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "language",
    defaultValue: lang == "en" ? "eng" : "рус",
    onChange: onChange,
  });

  const group = getRootProps();
  return (
    <HStack {...group}>
      {options.map((value) => {
        const radio = getRadioProps({ value });
        return (
          <RadioCard key={value} {...radio}>
            {value}
          </RadioCard>
        );
      })}
    </HStack>
  );
};

export default LanguageSwitch;
