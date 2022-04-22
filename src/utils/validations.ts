import * as yup from 'yup';
import getT from "next-translate/getT";

// TODO: translate RegisterFormSchema oneOf error, Перевести форму регистраии
const setYupLocale = (t: Function) => {
  yup.setLocale({
    mixed: {
      default: ({ path }) => t("yup:mixedDefault", { path: t(path) }),
      required: ({ path }) => t("yup:mixedRequired", { path: t(path) }),
      // oneOf: (t) => console.log(t)
    },
    string: {
      min: ({ min, path }) => t("yup:stringMin", { path: t(path), min })
    }
  })
};


export const LoginFormSchema = (t: Function) => {
  setYupLocale(t);

  return yup.object().shape({
    emailOrUsername: yup.string().required().min(3),
    password: yup.string().required().min(6),
  })
};

export const RegisterFormSchema = (t: Function) => {
  setYupLocale(t);

  return yup.object().shape({
    username: yup.string().required().min(3),
    email: yup.string().required().email(),
    password: yup.string().required().min(6),
    confirmPassword: yup
      .string()
      .when("password", (password, field) =>
        password
          ? field
            .required()
            .oneOf(
              [yup.ref("password")],
              t("yup:oneOfConfirmPassword")
            )
          : field
      ),
  })
};