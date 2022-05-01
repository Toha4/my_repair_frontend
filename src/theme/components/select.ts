import type { ComponentStyleConfig } from "@chakra-ui/theme";
import { mode } from "@chakra-ui/theme-tools"
import Input from "./input"


const Select: ComponentStyleConfig = {
  variants: Input.variants,
  defaultProps: {
    variant: 'brandOutline',
    size: "sm",
  },
}

export default Select;