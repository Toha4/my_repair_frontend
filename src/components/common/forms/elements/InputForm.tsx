import React from "react";
import {
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Skeleton,
} from "@chakra-ui/react";
import ConnectForm from "./ConnectForm";

interface IInputForm {
  name: string;
  keyItem: string;
  isRequired?: boolean;
  loading?: boolean;
}

const InputForm: React.FC<IInputForm> = ({ name, keyItem, isRequired, loading=false }) => (
  <FormControl isRequired={isRequired}>
    <ConnectForm>
      {({ register, formState: { errors } }) => (
        <div>
          <FormLabel htmlFor={keyItem}>{name}</FormLabel>
          <Skeleton isLoaded={!loading}>
            <Input {...register(keyItem)} />
          </Skeleton>
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
