import * as yup from "yup";
import { setYupLocale } from "../../../utils/validations";

const PositionFormNestedSchema = {
  name: yup.string().required(),
  room: yup.number().required(),
  category: yup.number().required(),
  link: yup.string(),
  note: yup.string(),
  price: yup.number().required().transform((v) => (v === '' || Number.isNaN(v) ? undefined : v)).min(0),
  quantity: yup.number().required().transform((v) => (v === '' || Number.isNaN(v) ? undefined : v)).positive(),
  is_service: yup.boolean(),
  is_delivery: yup.boolean(),
};

export const CheckFormSchema = (t: Function) => {
  setYupLocale(t);

  return yup.object().shape({
    date: yup.date().required(),
    shop: yup.number().required().transform((v) => (v === '' || Number.isNaN(v) ? undefined : v)),
    positions: yup.array().of(yup.object().shape(PositionFormNestedSchema)).required().min(1),
  });
};

export const PositionFormSchema = (t: Function) => {
  setYupLocale(t);

  return yup.object().shape({
    name: yup.string().required(),
    room: yup.number().required(),
    category: yup.number().required(),
    link: yup.string(),
    note: yup.string(),
    price: yup.number().required().transform((v) => (v === '' || Number.isNaN(v) ? undefined : v)).min(0),
    quantity: yup.number().required().transform((v) => (v === '' || Number.isNaN(v) ? undefined : v)).positive(),
    is_service: yup.boolean(),
    is_delivery: yup.boolean(),
  });
};
