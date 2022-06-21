import * as yup from 'yup';


const setYupLocale = (t: Function) => {
  yup.setLocale({
    mixed: {
      default: ({ path }) => t("yup:mixedDefault", { path: t(path) }),
      required: ({ path }) => t("yup:mixedRequired", { path: t(path) }),
      // oneOf: (t) => console.log(t)
    },
    string: {
      min: ({ min, path }) => t("yup:stringMin", { path: t(path), min })

    },
    number: {
      positive: ({ more, path }) => t("yup:numberPositive", { path: t(path), more })
    }
  })
};


export const LoginFormSchema = (t: Function) => {
  setYupLocale(t);

  return yup.object().shape({
    emailOrUsername: yup.string().required().min(3),
    password: yup.string().required().min(5),
  })
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


export const PofileSettingsFormSchema = (t: Function) => {
  setYupLocale(t);

  return yup.object().shape({
    email: yup.string().email(),
    password: yup
      .string()
      .nullable()
      .notRequired()
      .when("password", {
        is: (value: string) => value?.length,
        then: (rule) => rule.min(5),
      }),
    confirmPassword: yup
      .string()
      .when("password", (password, field) =>
        password
          ? field
            .oneOf(
              [yup.ref("password")],
              t("yup:oneOfConfirmPassword")
            )
          : field
      ),
  },
    [
      ['password', 'password'],
    ])
};


export const HomeFormSchema = (t: Function) => {
  setYupLocale(t);

  return yup.object().shape({
    name: yup.string().required(),
    type: yup.number().required().nullable().transform((v) => (v === '' || Number.isNaN(v) ? null : v)),
    square: yup.number().positive().nullable().transform((v) => (v === '' || Number.isNaN(v) ? null : v)),
  })
};