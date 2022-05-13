import type { ComponentStyleConfig } from "@chakra-ui/theme";
import { mode } from "@chakra-ui/theme-tools"


const Datepicker: ComponentStyleConfig = {
  baseStyle: props => ({
    border: "1px solid",
    borderRadius: "brand",
    borderColor: mode("blue.400", "gray.400")(props),
    bg: mode("white", "inherit")(props),
    cursor: "default",

    w: "100%",
    h: 8,
    fontSize: "sm",
    px: 3,

    _hover: {
      bg: mode("gray.100", "gray.700")(props),
    },
    _focus: {
      outline: "1px solid var(--brandBlue)"
    },
  }),  
}

export default Datepicker;