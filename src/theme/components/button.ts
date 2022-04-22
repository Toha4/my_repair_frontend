import type { ComponentStyleConfig } from "@chakra-ui/theme";
import { mode } from "@chakra-ui/theme-tools"


const Button: ComponentStyleConfig = {
  baseStyle: {
    borderRadius: "brand",
  },
  variants: {
    brandOutline: props => ({
      border: "1px solid",
      borderColor: mode("blue.400", "gray.400")(props),
      bg: mode("white", "gray.500")(props),
      color: mode("black", "white")(props),
      _hover: {
        bg: mode("gray.100", "gray.700")(props),
      }
    }),
    brandSolid: props => ({
      bg: "brandBlue",
      color: mode("white", "black")(props),
      _hover: {
        bg: mode("blue.500", "blue.300")(props),
      }
    }),    
    iconButton: {
      minW: "0px",
      h: "auto",
      border: "none",

      _hover: {
        bg: "none",
      },

      _focus: {
        boxShadow: "none"
      },
    }
  },
  defaultProps: {
    variant: 'outline',
  },
}

export default Button;