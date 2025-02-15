import React from "react";
import { Flex, FormControl, FormHelperText, FormLabel, Skeleton, Tooltip } from "@chakra-ui/react";
import ConnectForm from "../ConnectForm";
import { QuestionIcon } from "@chakra-ui/icons";
import style from "../../form.module.scss";
import { Select, OptionBase } from "chakra-react-select";

import { Controller } from "react-hook-form";


export interface IMultiselectOption extends OptionBase {
  label: string;
  value: string;
}

interface IMultiSelectForm {
  options: IMultiselectOption[];
  name?: string;
  keyItem: string;
  isRequired?: boolean;
  placeholder?: string;
  disabled?: boolean;
  tooltip?: string;
  helpText?: string;
  loading?: boolean;
  isInvalid?: boolean;
}

const MultiSelectForm: React.FC<IMultiSelectForm> = ({
  options,
  name,
  keyItem,
  isRequired,
  placeholder,
  disabled,
  tooltip,
  helpText,
  loading = false,
  isInvalid,
}) => (
  <FormControl isRequired={isRequired}>
    <ConnectForm>
      {({ control, formState: { errors } }) => (
        <div>
          {!!name && (
            <FormLabel htmlFor={keyItem}>
              {name}
              {!!tooltip && (
                <Tooltip label={tooltip} fontSize="md" closeOnScroll>
                  <QuestionIcon className={style.formLabelTooltipIcon} />
                </Tooltip>
              )}
            </FormLabel>
          )}
          <Controller
            control={control}
            name={keyItem}
            render={({ field }) => {
              return (
                <Flex width="100%">
                  <Skeleton isLoaded={!loading}>
                    <Select
                      options={options}
                      placeholder={placeholder}
                      value={field.value}
                      onChange={(value: any) => {field.onChange(value)}}
                      chakraStyles={{
                        control: (baseStyles: any, state: any) => ({
                          ...baseStyles,
                          borderColor: isInvalid ? "red" : baseStyles.borderColor,
                        }),
                      }}
                      isInvalid
                      isDisabled={disabled}
                      size="sm"
                      isMulti
                      tagVariant="solid"
                    />
                  </Skeleton>
                </Flex>
              );
            }}
          />
          {!!helpText && <FormHelperText color="gray">{helpText}</FormHelperText>}
          {errors[keyItem] && (
            <FormHelperText color="red">{errors[keyItem].message && errors[keyItem].message}</FormHelperText>
          )}
        </div>
      )}
    </ConnectForm>
  </FormControl>
);

export default MultiSelectForm;
