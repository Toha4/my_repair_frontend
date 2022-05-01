import React from "react";
import {
  FormControl,
  FormHelperText,
  FormLabel,
  Select,
} from "@chakra-ui/react";
import ConnectForm from "./ConnectForm";

interface IFormInput {
  name: string;
  keyItem: string;
  isRequired?: boolean;
  placeholder?: string;
}

const SelectForm: React.FC<IFormInput> = ({
  children,
  name,
  keyItem,
  isRequired,
  placeholder,
}) => (
  <FormControl isRequired={isRequired}>
    <ConnectForm>
      {({ register, formState: { errors } }) => (
        <div>
          <FormLabel htmlFor={keyItem}>{name}</FormLabel>
          <Select {...register(keyItem)} placeholder={placeholder}>
            {children}
          </Select>
          {errors[keyItem] && (
            <FormHelperText color="red">
              {errors[keyItem].message && errors[keyItem].message}
            </FormHelperText>
          )}
        </div>
      )}
    </ConnectForm>
  </FormControl>
);

export default SelectForm;
