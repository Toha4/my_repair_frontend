import React from "react";
import { Checkbox, FormControl, Skeleton, Tooltip } from "@chakra-ui/react";
import ConnectForm from "./ConnectForm";

interface ICheckboxIconForm {
  icon: React.ReactElement<any, string | React.JSXElementConstructor<any>>;
  keyItem: string;
  isRequired?: boolean;
  loading?: boolean;
  tooltipLabel?: string;
}

const CheckboxIconForm: React.FC<ICheckboxIconForm> = ({ icon, keyItem, isRequired, loading = false, tooltipLabel }) => (
  <FormControl isRequired={isRequired}>
    <ConnectForm>
      {({ register, formState: { errors } }) => (
        <div>
          <Skeleton isLoaded={!loading}>
          <Tooltip label={tooltipLabel} shouldWrapChildren>
            <Checkbox {...register(keyItem)}>
              {icon}</Checkbox>
          </Tooltip>
          </Skeleton>
        </div>
      )}
    </ConnectForm>
  </FormControl>
);

export default CheckboxIconForm;
