import React from "react";
import { FormControl, FormHelperText, FormLabel, Skeleton } from "@chakra-ui/react";
import ConnectForm from "./ConnectForm";
import { Controller } from "react-hook-form";
import DatePicker from "../../DatePicker";

interface IFormInput {
  name?: string;
  keyItem: string;
  isRequired?: boolean;
  placeholder?: string;
  loading?: boolean;
}

const DatepickerForm: React.FC<IFormInput> = ({ name, keyItem, isRequired, placeholder, loading = false}) => (
  <FormControl isRequired={isRequired}>
    <ConnectForm>
      {({ control, formState: { errors } }) => (
        <div>
          {!!name && <FormLabel htmlFor={keyItem}>{name}</FormLabel>}
          <Controller
            control={control}
            name={keyItem}
            render={({ field }) => {
              return (
                <Skeleton isLoaded={!loading}>
                  <DatePicker
                    placeholderText={placeholder}
                    onChange={(date) => field.onChange(date)}
                    selected={field.value}
                    isClearable={!isRequired}
                  />
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

export default DatepickerForm;
