import defaultTheme from '@chakra-ui/theme';
import { extendTheme } from "@chakra-ui/react";
import Button from "./components/button";
import Input from "./components/input";
import Textarea from './components/textarea';
import NumberInput from './components/number-input';
import RadioCard from "./components/radio-card";
import Tabs from './components/tabs';
import Table from './components/table';
import Select from "./components/select";
import Datepicker from './components/datepicker';
import Checkbox from './components/checkbox';
import Modal from './components/modal';
import { mode } from "@chakra-ui/theme-tools"
import colors from './colors';
import styles from './styles';


const overrides = {
  ...defaultTheme,
  styles,
  colors,
  radii: {
    brand: "3px"
  },
  components: {
    Button,
    Input,
    Textarea,
    NumberInput,
    RadioCard,
    Tabs,
    Table,
    Select,
    Datepicker,
    Checkbox,
    Modal
  },
};

export default extendTheme(overrides);
