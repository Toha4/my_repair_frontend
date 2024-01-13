import { mode } from "@chakra-ui/theme-tools"
import colors from './colors';


const globalStyles = (props: any) => ({
  ":root": {
    "--brandBlue": mode(colors.blue["400"], colors.blue["200"])(props),
    "--brandGray": mode(colors.gray["100"], colors.gray["600"])(props),
  },


  ".react-datepicker, .react-datepicker__month-container": {
    borderRadius: "brand",
  },
  ".react-datepicker__header": {
    background: "var(--brandBlue)",
    "borderTopRightRadius": "0 !important",
    "borderTopLeftRadius": "0 !important",
  },
  ".react-datepicker__current-month, .react-datepicker__day-name": {
    color: mode("white", "black")(props),
  },
  ".react-datepicker__day": {
    color: mode("black", "white")(props),
    "_selected": {
      background: "var(--brandBlue)",
      color: mode("white", "black")(props),
      borderRadius: "brand",
      _hover: {
        background: mode("blue.500", "blue.300")(props)
      }
    },
    _hover: {
      borderRadius: "brand",
      background: "var(--brandBlue)",
    }
  },
  ".react-datepicker__day--keyboard-selected": {
    background: "var(--brandBlue)",
    color: mode("white", "black")(props),
    borderRadius: "brand",
    _hover: {
      background: mode("blue.500", "blue.300")(props)
    }
  },
  ".react-datepicker__navigation *::before": {
    "borderColor": mode("white", "black")(props),
  },
  ".react-datepicker__navigation:hover *::before": {
    "borderColor": mode("gray.300", "white")(props),
  },
  ".react-datepicker__navigation-icon": {
    top: "7px",
  },
  ".react-datepicker__month-container": {
    background: "var(--brandGray)",
  },
});

const styles = {
  global: globalStyles,
}

export default styles;