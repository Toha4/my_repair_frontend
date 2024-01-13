import React from "react";
import { Button, Flex, FormControl, FormHelperText, FormLabel, Select, Skeleton, Tooltip } from "@chakra-ui/react";
import ConnectForm from "./ConnectForm";
import { QuestionIcon } from "@chakra-ui/icons";
import style from "../form.module.scss";

interface ISelectForm {
  name?: string;
  keyItem: string;
  isRequired?: boolean;
  placeholder?: string;
  disabled?: boolean;
  tooltip?: string;
  helpText?: string;
  loading?: boolean;
  onAddItem?: () => void;
  isInvalid?: boolean;
}

const SelectForm: React.FC<ISelectForm> = ({
  children,
  name,
  keyItem,
  isRequired,
  placeholder,
  disabled,
  tooltip,
  helpText,
  loading = false,
  onAddItem,
  isInvalid,
}) => (
  <FormControl isRequired={isRequired}>
    <ConnectForm>
      {({ register, formState: { errors } }) => (
        <div>
          {!!name && (
            <FormLabel htmlFor={keyItem}>
              {name}
              {!!tooltip && (
                <Tooltip label={tooltip} fontSize="md">
                  <QuestionIcon className={style.formLabelTooltipIcon} />
                </Tooltip>
              )}
            </FormLabel>
          )}
          <Flex width="100%">
            <Skeleton isLoaded={!loading} width="100%">
              <Select {...register(keyItem)} placeholder={placeholder} disabled={disabled} width="100%" borderColor={isInvalid ? "red" : undefined}>
                {children}
              </Select>
            </Skeleton>
            {!!onAddItem && (
              <Button variant="brandOutline" onClick={onAddItem} ml="10px">
                +
              </Button>
            )}
          </Flex>
          {!!helpText && <FormHelperText color="gray">{helpText}</FormHelperText>}
          {errors[keyItem] && (
            <FormHelperText color="red">{errors[keyItem].message && errors[keyItem].message}</FormHelperText>
          )}
        </div>
      )}
    </ConnectForm>
  </FormControl>
);

export default SelectForm;
