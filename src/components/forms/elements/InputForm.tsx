import React from "react";
import {
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import ConnectForm from "./ConnectForm";

interface IFormInput {
  name: string;
  keyItem: string;
  isRequired?: boolean;
}

const InputForm: React.FC<IFormInput> = ({ name, keyItem, isRequired }) => (
  <FormControl isRequired={isRequired}>
    <ConnectForm>
      {({ register, formState: { errors } }) => (
        <div>
          <FormLabel htmlFor={keyItem}>{name}</FormLabel>
          <Input {...register(keyItem)} />
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

export default InputForm;
