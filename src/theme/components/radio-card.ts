import type { ComponentStyleConfig } from "@chakra-ui/theme";
import { mode } from "@chakra-ui/theme-tools"


const RadioCard: ComponentStyleConfig = {
  baseStyle: props => ({
    cursor: "pointer",
    borderRadius: "brand",
    padding: "0 3px 3px 3px",
    bg: mode("white", "gray.500")(props),
    
    _hover: {
      bg: mode("gray.300", "gray.700")(props),
    },

    _checked: {
      bg: "brandBlue",
      color: mode("white", "black")(props),

      _hover: {
        bg: mode("blue.500", "blue.300")(props),
      }
    }
  }),
}

export default RadioCard;