import * as yup from "yup";
import { setYupLocale } from "../../utils/validations";

export const ApiKeyFormSchema = (t: Function) => {
  setYupLocale(t);

  return yup.object().shape({
    api_key: yup.string().required(),
  });
};
