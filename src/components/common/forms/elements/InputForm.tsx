import React from "react";
import { FormControl, FormHelperText, FormLabel, Input, Skeleton } from "@chakra-ui/react";
import ConnectForm from "./ConnectForm";

interface IInputForm {
  name?: string;
  keyItem: string;
  isRequired?: boolean;
  loading?: boolean;
  placeholder?: string;
  isInvalid?: boolean;
  autoCompleteDisabled?: boolean;
  type?: string;
  isDisabled?: boolean;
}

const InputForm: React.FC<IInputForm> = ({
  name,
  keyItem,
  isRequired,
  loading = false,
  placeholder,
  isInvalid,
  autoCompleteDisabled,
  type,
  isDisabled
}) => (
  <FormControl isRequired={isRequired}>
    <ConnectForm>
      {({ register, formState: { errors } }) => (
        <div>
          {!!name && <FormLabel htmlFor={keyItem} whiteSpace="nowrap">{name}</FormLabel>}
          <Skeleton isLoaded={!loading}>
            <Input
              placeholder={placeholder}
              borderColor={isInvalid ? "red" : undefined}
              autoComplete={autoCompleteDisabled ? "off" : undefined}
              type={type}
              disabled={isDisabled}
              {...register(keyItem)}
            />
          </Skeleton>
          {errors[keyItem] && (
            <FormHelperText color="red">{errors[keyItem].message && errors[keyItem].message}</FormHelperText>
          )}
        </div>
      )}
    </ConnectForm>
  </FormControl>
);

export default InputForm;
