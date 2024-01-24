import * as yup from "yup";
import { setYupLocale } from "../../utils/validations";

export const PofileSettingsFormSchema = (t: Function) => {
  setYupLocale(t);

  return yup.object().shape(
    {
      email: yup.string().email(),
      firstName: yup.string(),
      lastName: yup.string(),
      // password: yup
      //   .string()
      //   .nullable()
      //   .notRequired()
      //   .when("password", {
      //     is: (value: string) => value?.length,
      //     then: (rule) => rule.min(5),
      //   }),
      // confirmPassword: yup
      //   .string()
      //   .when("password", (password, field) =>
      //     password
      //       ? field
      //         .oneOf(
      //           [yup.ref("password")],
      //           t("yup:oneOfConfirmPassword")
      //         )
      //       : field
      //   ),
    },
    [["password", "password"]]
  );
};

export const RepairObjectFormSchema = (t: Function) => {
  setYupLocale(t);

  return yup.object().shape({
    name: yup.string().required(),
    type: yup
      .number()
      .required()
      .nullable()
      .transform((v) => (v === "" || Number.isNaN(v) ? null : v)),
    square: yup
      .number()
      .positive()
      .nullable()
      .transform((v) => (v === "" || Number.isNaN(v) ? null : v)),
  });
};

export const BuildingFormSchema = (t: Function) => {
  setYupLocale(t);

  return yup.object().shape({
    name: yup.string().required(),
    square: yup
      .number()
      .positive()
      .nullable()
      .transform((v) => (v === "" || Number.isNaN(v) ? null : v)),
    date_begin: yup.date().nullable(),
    date_end: yup.date().nullable(),
  });
};

export const RoomFormSchema = (t: Function) => {
  setYupLocale(t);

  return yup.object().shape({
    name: yup.string().required(),
    square: yup
      .number()
      .positive()
      .nullable()
      .transform((v) => (v === "" || Number.isNaN(v) ? null : v)),
    date_begin: yup.date().nullable(),
    date_end: yup.date().nullable(),
  });
};

export const ShopFormSchema = (t: Function) => {
  setYupLocale(t);

  return yup.object().shape({
    name: yup.string().required(),
    link: yup.string(),
  });
};

export const CategoryFormSchema = (t: Function) => {
  setYupLocale(t);

  return yup.object().shape({
    name: yup.string().required(),
  });
};
