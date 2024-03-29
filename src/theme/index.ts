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
import Tag from './components/tag';
import colors from './colors';
import styles from './styles';
import { MultiSelectTheme } from 'chakra-multiselect';


const overrides = {
  ...defaultTheme,
  styles,
  colors,
  radii: {
    brand: "3px"
  },
  components: {
    MultiSelect: MultiSelectTheme,
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
    Modal,
    Tag
  },
};

export default extendTheme(overrides);
