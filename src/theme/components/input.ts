import type { ComponentStyleConfig } from "@chakra-ui/theme";
import { mode } from "@chakra-ui/theme-tools"


const Input: ComponentStyleConfig = {
  variants: {
    brandOutline: props => ({
      field: {
        border: "1px solid",
        borderRadius: "brand",
        borderColor: mode("blue.400", "gray.400")(props),
        bg: mode("white", "inherit")(props),
        color: mode("black", "white")(props),
        _hover: {
          bg: mode("gray.100", "gray.700")(props),
        }
      }
    }),
  },
  defaultProps: {
    variant: 'brandOutline',
  },
}

export default Input;