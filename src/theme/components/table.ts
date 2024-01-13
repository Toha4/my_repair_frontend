import type { ComponentStyleConfig } from "@chakra-ui/theme";
import { mode } from "@chakra-ui/theme-tools";

const Table: ComponentStyleConfig = {
  baseStyle: (props) => ({
    table: {
      bg: mode("white", "gray.500")(props),
    },
  }),
  variants: {
    simple: (props) => ({
      th: {
        fontFamily: `'Inter Variable', sans-serif`,
        color: mode("black", "white")(props),
        bg: mode("white", "gray.500")(props),
        whiteSpace: "pre-line",
        textTransform: "none",
        padding: "10px"
      },
      td: {
        fontFamily: `'Inter Variable', sans-serif`,
        color: mode("black", "white")(props),
        bg: mode("white", "gray.500")(props),
        whiteSpace: "pre-line",
        padding: "8px 10px 8px 10px",
      },
      // tr: {
      //   _hover: {
      //     bg: mode("gray.300", "gray.700")(props),
      //   }
      // },
    }),
  },
};

export default Table;
