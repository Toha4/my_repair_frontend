import * as yup from "yup";
import { setYupLocale } from "../../../utils/validations";

export const LoginFormSchema = (t: Function) => {
  setYupLocale(t);

  return yup.object().shape({
    emailOrUsername: yup.string().required().min(3),
    password: yup.string().required().min(5),
  });
};

export const RegisterFormSchema = (t: Function) => {
  setYupLocale(t);

  return yup.object().shape({
    username: yup.string().required().min(3),
    email: yup.string().required().email(),
    password: yup.string().required().min(5),
    confirmPassword: yup
      .string()
      .when("password", (password, field) =>
        password ? field.required().oneOf([yup.ref("password")], t("yup:oneOfConfirmPassword")) : field
      ),
  });
};
