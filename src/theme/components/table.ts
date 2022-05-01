import type { ComponentStyleConfig } from "@chakra-ui/theme";
import { mode } from "@chakra-ui/theme-tools";


const Table: ComponentStyleConfig = {
  baseStyle: props => ({
    table: {
      bg: mode("white", "gray.500")(props)
    }
  }),
  variants: {
    simple: props => ({
      th: {
        color: mode("black", "white")(props),
        bg: mode("white", "gray.500")(props),
        whiteSpace: "pre-line",
      },
      // tr: {
      //   _hover: {
      //     bg: mode("gray.300", "gray.700")(props),
      //   }
      // },
    }),
  },
}

export default Table;