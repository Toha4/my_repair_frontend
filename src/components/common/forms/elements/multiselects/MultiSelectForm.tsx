import React from "react";
import { Flex, FormControl, FormHelperText, FormLabel, Skeleton, Tooltip } from "@chakra-ui/react";
import ConnectForm from "../ConnectForm";
import { QuestionIcon } from "@chakra-ui/icons";
import style from "../../form.module.scss";
import { Select, OptionBase, MultiValue, ActionMeta } from "chakra-react-select";

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
                  <Skeleton isLoaded={!loading} width="100%">
                    <Select
                      options={options}
                      placeholder={placeholder}
                      menuPortalTarget={document.body}
                      styles={{
                        menuPortal: (provided) => ({
                          ...provided,
                          // This is the z-index of the normal select in Chakra.
                          zIndex: 1500,
                        }),
                      }}
                      value={
                        // Преобразуем `number[]` (из формы) → `IMultiselectOption[]` (для Select)
                        options.filter(opt => 
                          Array.isArray(field.value) 
                            ? field.value.includes(Number(opt.value))  // string → number
                            : false
                        )
                      }
                      onChange={(
                        newValue: MultiValue<IMultiselectOption>,
                        _actionMeta: ActionMeta<IMultiselectOption>
                      ) => {
                        // Преобразуем `MultiValue<IMultiselectOption>` → `number[]`
                        const selectedValues = newValue 
                          ? newValue.map(opt => Number(opt.value))  // string → number
                          : [];
                        field.onChange(selectedValues);
                      }}
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
