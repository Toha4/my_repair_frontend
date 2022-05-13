import React from "react";
import useTranslation from "next-translate/useTranslation";
import { useStyleConfig, chakra } from "@chakra-ui/react";
import "react-datepicker/dist/react-datepicker.css";
import DatePickerReact, { ReactDatePickerProps, registerLocale } from "react-datepicker";

import ru from 'date-fns/locale/ru';
registerLocale('ru', ru)

const DATE_FORMAT = "dd.MM.yyyy";

const ChakraDatePicker = chakra(DatePickerReact as any);


const DatePicker = ({ ...props }: ReactDatePickerProps) => {
  const styles = useStyleConfig('Datepicker');
  const { lang } = useTranslation("settings");

  return (
    <ChakraDatePicker
      dateFormat={DATE_FORMAT}
      __css={styles}
      locale={lang}
      {...props}
    />
  );
};

export default DatePicker;