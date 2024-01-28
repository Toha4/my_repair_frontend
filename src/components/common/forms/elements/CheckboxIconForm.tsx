import React from "react";
import { Checkbox, FormControl, Skeleton, Tooltip } from "@chakra-ui/react";
import ConnectForm from "./ConnectForm";
import { Controller } from "react-hook-form";

interface ICheckboxIconForm {
  icon: React.ReactElement<any, string | React.JSXElementConstructor<any>>;
  keyItem: string;
  isRequired?: boolean;
  loading?: boolean;
  tooltipLabel?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const CheckboxIconForm: React.FC<ICheckboxIconForm> = ({
  icon,
  keyItem,
  isRequired,
  loading = false,
  tooltipLabel,
  onChange,
}) => (
  <FormControl isRequired={isRequired}>
    <ConnectForm>
      {({ control, formState: { errors } }) => (
        <Controller
          control={control}
          name={keyItem}
          render={({ field }) => {
            return (
              <Skeleton isLoaded={!loading}>
                <Tooltip label={tooltipLabel} shouldWrapChildren closeOnScroll>
                  <Checkbox
                    onChange={(e) => {
                      field.onChange(e.target.checked);
                      if (onChange) onChange(e);
                    }}
                    isChecked={field.value}
                    isDisabled={field.disabled}
                  >
                    {icon}
                  </Checkbox>
                </Tooltip>
              </Skeleton>
            );
          }}
        />
      )}
    </ConnectForm>
  </FormControl>
);

export default CheckboxIconForm;
