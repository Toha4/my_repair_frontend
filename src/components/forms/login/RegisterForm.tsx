// TODO: Не изменено
import React from "react";
import style from "../form.module.scss";
import useTranslation from "next-translate/useTranslation";

import {
  FormControl,
  // FormLabel,
  // FormErrorMessage,
  FormHelperText,
  Input,
  Box,
  Button,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import { RegisterFormSchema } from "../../../utils/validations";

interface IFormInputs {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const RegisterForm: React.FC = () => {
  const { t } = useTranslation("login");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>({
    mode: "onTouched",
    reValidateMode: "onSubmit",
    resolver: yupResolver(RegisterFormSchema(t)),
  });

  const onSubmit = (value: IFormInputs) => {
    console.log("value: ", value);
  };

  return (
    <Box>
      <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
        <FormControl>
          <Input
            placeholder={t("registerLoginPlaceholder")}
            id="username"
            {...register("username")}
          />
          {errors.username && (
            <FormHelperText color="red">
              {errors.username.message && errors.username.message}
            </FormHelperText>
          )}
        </FormControl>
        <FormControl>
          <Input
            placeholder={t("registerEmailPlaceholder")}
            id="email"
            type="email"
            {...register("email")}
          />
          {errors.email && (
            <FormHelperText color="red">
              {errors.email.message && errors.email.message}
            </FormHelperText>
          )}
        </FormControl>
        <FormControl>
          <Input
            placeholder={t("registerPasswordPlaceholder")}
            id="password"
            type="password"
            {...register("password")}
          />
          {errors.password && (
            <FormHelperText color="red">
              {errors.password.message && errors.password.message}
            </FormHelperText>
          )}
        </FormControl>
        <FormControl>
          <Input
            placeholder={t("registerСonfirmPasswordPlaceholder")}
            id="confirmPassword"
            type="password"
            {...register("confirmPassword")}
          />
          {errors.confirmPassword && (
            <FormHelperText color="red">
              {errors.confirmPassword.message && errors.confirmPassword.message}
            </FormHelperText>
          )}
        </FormControl>
        <Button
          type="submit"
          variant="brandSolid"
          isFullWidth
        >
          {t("buttonRegister")}
        </Button>
      </form>
    </Box>
  );
};

export default RegisterForm;
