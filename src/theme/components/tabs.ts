import type { ComponentStyleConfig } from "@chakra-ui/theme";


const Tabs: ComponentStyleConfig = {
  baseStyle: {
    tab: {
      _focus: {
        boxShadow: "none",
      },
    }
  },
  variants: {
    line: {
      tab: {
        _selected: {
          color: "brandBlue",
        },
        _active: {
          bg: "brandGray",
        },
      }
    },
  },
}

export default Tabs;