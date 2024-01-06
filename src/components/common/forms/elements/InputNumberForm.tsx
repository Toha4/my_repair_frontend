import React from "react";
import {
  FormControl,
  FormHelperText,
  FormLabel,
  NumberInput,
  NumberInputField,
  Skeleton,
} from "@chakra-ui/react";
import ConnectForm from "./ConnectForm";
import { Controller } from "react-hook-form";

interface IFormInput {
  name: string;
  keyItem: string;
  isRequired?: boolean;
  loading?: boolean;
}

const InputNumberForm: React.FC<IFormInput> = ({
  name,
  keyItem,
  isRequired,
  loading = false
}) => (
  <FormControl isRequired={isRequired}>
    <ConnectForm>
      {({ control, formState: { errors } }) => (
        <div>
          <FormLabel htmlFor={keyItem}>{name}</FormLabel>
          <Controller
            control={control}
            name={keyItem}
            render={({ field }) => {
              return (
                <Skeleton isLoaded={!loading}>
                  <NumberInput 
                    onChange={(valueString) => field.onChange(valueString)}
                    value={!!field.value ? field.value : undefined}
                    step={0.01}
                  >
                    <NumberInputField />
                  </NumberInput>
                </Skeleton>
              );
            }}
          />
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

export default InputNumberForm;
