import React from "react";
import { Flex, FormControl, FormHelperText, FormLabel, Skeleton, Tooltip } from "@chakra-ui/react";
import ConnectForm from "../ConnectForm";
import { QuestionIcon } from "@chakra-ui/icons";
import style from "../../form.module.scss";
import { MultiSelect, Option } from "chakra-multiselect";
import { Controller } from "react-hook-form";

interface IMultiSelectForm {
  option: Option[];
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
  option,
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
                    <MultiSelect
                      options={option}
                      placeholder={placeholder}
                      value={field.value}
                      onChange={(value) => field.onChange(value)}
                      borderColor={isInvalid ? "red" : undefined}
                      disabled={disabled}
                      size="sm"
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
