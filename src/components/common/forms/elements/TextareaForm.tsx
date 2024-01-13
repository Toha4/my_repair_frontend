import React from "react";
import { FormControl, FormHelperText, FormLabel, Skeleton, Textarea } from "@chakra-ui/react";
import ConnectForm from "./ConnectForm";

interface ITextareaForm {
  name?: string;
  keyItem: string;
  isRequired?: boolean;
  loading?: boolean;
  placeholder?: string;
  isInvalid?: boolean;
}

const TextareaForm: React.FC<ITextareaForm> = ({ name, keyItem, isRequired, loading = false, placeholder, isInvalid }) => (
  <FormControl isRequired={isRequired}>
    <ConnectForm>
      {({ register, formState: { errors } }) => (
        <div>
          {!!name && <FormLabel htmlFor={keyItem}>{name}</FormLabel>}
          <Skeleton isLoaded={!loading}>
            <Textarea minHeight="42px" placeholder={placeholder} borderColor={isInvalid ? "red" : undefined} {...register(keyItem)} />
          </Skeleton>
          {errors[keyItem] && (
            <FormHelperText color="red">{errors[keyItem].message && errors[keyItem].message}</FormHelperText>
          )}
        </div>
      )}
    </ConnectForm>
  </FormControl>
);

export default TextareaForm;
