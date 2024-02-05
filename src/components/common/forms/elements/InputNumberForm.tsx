import React from "react";
import {
  FormControl,
  FormHelperText,
  FormLabel,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Skeleton,
} from "@chakra-ui/react";
import ConnectForm from "./ConnectForm";
import { Controller } from "react-hook-form";

interface IFormInput {
  name?: string;
  keyItem: string;
  isRequired?: boolean;
  loading?: boolean;
  isInvalid?: boolean;
  withStepper?: boolean;
  minValue?: number;
  maxValue?: number;
  step?: number;
  precision?: number;
  format?: (val: number) => string;
  parse?: (val: string) => string;
}

const InputNumberForm: React.FC<IFormInput> = ({
  name,
  keyItem,
  isRequired,
  loading = false,
  isInvalid,
  withStepper,
  minValue,
  maxValue,
  step = 0.01,
  precision = 2,
  format,
  parse,
}) => {
  const setValue = (fieldValue: number) => {
    if (!fieldValue) return undefined;
    if (format) return format(fieldValue);
    return fieldValue;
  };

  return (
    <FormControl isRequired={isRequired}>
      <ConnectForm>
        {({ control, formState: { errors } }) => (
          <div>
            {!!name && <FormLabel htmlFor={keyItem} whiteSpace="nowrap">{name}</FormLabel>}
            <Controller
              control={control}
              name={keyItem}
              render={({ field }) => {
                return (
                  <Skeleton isLoaded={!loading}>
                    <NumberInput
                      onChange={(valueString) =>
                        parse ? field.onChange(parse(valueString)) : field.onChange(valueString)
                      }
                      value={setValue(field.value)}
                      step={step}
                      borderColor={isInvalid ? "red" : undefined}
                      precision={precision}
                      min={minValue}
                      max={maxValue}
                    >
                      <NumberInputField />
                      {withStepper && (
                        <NumberInputStepper>
                          <NumberIncrementStepper />
                          <NumberDecrementStepper />
                        </NumberInputStepper>
                      )}
                    </NumberInput>
                  </Skeleton>
                );
              }}
            />
            {errors[keyItem] && (
              <FormHelperText color="red">{errors[keyItem].message && errors[keyItem].message}</FormHelperText>
            )}
          </div>
        )}
      </ConnectForm>
    </FormControl>
  );
};

export default InputNumberForm;
