import defaultTheme from '@chakra-ui/theme';
import { extendTheme } from "@chakra-ui/react";
import Button from "./components/button";
import Input from "./components/input";
import RadioCard from "./components/radio-card";
import { mode } from "@chakra-ui/theme-tools"

const colors = {
  brandBlue: "var(--brandBlue)",
  brandGray: "var(--brandGray)",
  blue: defaultTheme.colors.blue,
  gray: defaultTheme.colors.gray,
}

const overrides = {
  ...defaultTheme,
  styles: {
    global: (props: any) => ({
      ":root": {
        "--brandBlue": mode(colors.blue["400"], colors.blue["200"])(props),
        "--brandGray": mode(colors.gray["100"], colors.gray["600"])(props),
      },
    }),
  },
  colors,
  // colors,
  //   colors: {
  //     //   brand: {
  //     //     100: "#f7fafc",
  //     //     // ...
  //     //     900: "#1a202c",
  //     //   },
  //   },
  radii: {
    brand: "3px"
  },
  components: {
    Button,
    Input,
    RadioCard
  },
};



export default extendTheme(overrides);
