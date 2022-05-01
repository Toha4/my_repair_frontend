import defaultTheme from '@chakra-ui/theme';
import { extendTheme } from "@chakra-ui/react";
import Button from "./components/button";
import Input from "./components/input";
import NumberInput from './components/number-input';
import RadioCard from "./components/radio-card";
import Tabs from './components/tabs';
import Table from './components/table';
import Select from "./components/select";
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
  radii: {
    brand: "3px"
  },
  components: {
    Button,
    Input,
    NumberInput,
    RadioCard,
    Tabs,
    Table,
    Select
  },
};

export default extendTheme(overrides);
