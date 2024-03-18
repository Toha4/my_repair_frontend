import React from "react";
import { Checkbox, FormControl, Skeleton } from "@chakra-ui/react";
import ConnectForm from "./ConnectForm";
import { Controller } from "react-hook-form";

interface ICheckboxForm {
  title: string;
  keyItem: string;
  isRequired?: boolean;
  loading?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const CheckboxForm: React.FC<ICheckboxForm> = ({ title, keyItem, isRequired, loading = false, onChange }) => (
  <FormControl isRequired={isRequired}>
    <ConnectForm>
      {({ control, formState: { errors } }) => (
        <Controller
          control={control}
          name={keyItem}
          render={({ field }) => {
            return (
              <Skeleton isLoaded={!loading}>
                <Checkbox
                  onChange={(e) => {
                    field.onChange(e.target.checked);
                    if (onChange) onChange(e);
                  }}
                  isChecked={field.value}
                  isDisabled={field.disabled}
                >
                  {title}
                </Checkbox>
              </Skeleton>
            );
          }}
        />
      )}
    </ConnectForm>
  </FormControl>
);

export default CheckboxForm;
