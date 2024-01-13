import type { ComponentStyleConfig } from "@chakra-ui/theme";
import { mode } from "@chakra-ui/theme-tools";
import { runIfFn } from "../utils/run-if-fn";

const Checkbox: ComponentStyleConfig = {
  baseStyle: (props) => ({
    control: runIfFn(
      (props) => ({
        bg: mode("white", "inherit")(props),
        borderColor: mode("blue.400", "gray.400")(props),
        borderRadius: "brand",
      }),
      props
    ),
  }),
};

export default Checkbox;
