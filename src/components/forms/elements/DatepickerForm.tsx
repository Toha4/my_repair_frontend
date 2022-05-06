import React from "react";
import { FormControl, FormHelperText, FormLabel } from "@chakra-ui/react";
import ConnectForm from "./ConnectForm";
import { Controller } from "react-hook-form";
import DatePicker from "../../DatePicker";

interface IFormInput {
  name: string;
  keyItem: string;
  isRequired?: boolean;
  placeholder?: string;
}

const DatepickerForm: React.FC<IFormInput> = ({ name, keyItem, isRequired, placeholder, }) => (
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
                <DatePicker
                  placeholderText={placeholder}
                  onChange={(date) => field.onChange(date)}
                  selected={field.value}
                />
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
