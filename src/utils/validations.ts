import * as yup from 'yup';

// locales: Поля берутся из ns common

export const setYupLocale = (t: Function) => {
  yup.setLocale({
    mixed: {
      default: ({ path }) => t("yup:mixedDefault", { path: t(`common:${path}`) }),
      required: ({ path }) => t("yup:mixedRequired", { path: t(`common:${path}`) }),
    },
    string: {
      min: ({ min, path }) => t("yup:stringMin", { path: t(`common:${path}`), min }),
      max: ({ max, path }) => t("yup:stringMax", { path: t(`common:${path}`), max })

    },
    number: {
      positive: ({ more, path }) => t("yup:numberPositive", { path: t(`common:${path}`), more })
    }
  })
};
