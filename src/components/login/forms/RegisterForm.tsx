import React, { useEffect } from "react";
import style from "../login.module.scss";
import useTranslation from "next-translate/useTranslation";

import {
  FormControl,
  FormHelperText,
  Input,
  Box,
  Button,
  useToast,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import { RegisterFormSchema } from "./validations";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { OurStore } from "../../../redux/store";
import { register as registerAction, reset as resetAction } from "../../../redux/slices/authSlice";
import { useRouter } from "next/router";
import { IRegister, LoadingStatus } from "../../../redux/types";


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

  const dispatch = useAppDispatch();
  const { loading, register_success, error } = useAppSelector((state: OurStore) => state.authReducer);

  const onSubmit = (value: IFormInputs) => {
    if (dispatch && dispatch !== null && dispatch !== undefined) {
      const data = {
        username: value.username,
        email: value.email,
        password: value.password,
      } as IRegister;
      dispatch(registerAction(data));
    }
  };

  const router = useRouter();
  useEffect(() => {
    if (register_success) {
      router.push("/confirmation_email")
    }
  }, [register_success])

  const toast = useToast();
  useEffect(() => {
    if (error) {
      let title: string;
      if (error.message === "Username already exists") {
        title = t("UsernameAlreadyExists");
      }
      else if (error.message === "Email already exists") {
        title = t("EmailAlreadyExists");
      }
      else {
        title = error.message ? error.message : "";
      }
      toast({ title, status: "error" });

      dispatch(resetAction());
    }
  }, [error]);

  return (
    <Box>
      <form className={style.loginForm} onSubmit={handleSubmit(onSubmit)}>
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
          width="100%"
          isLoading={loading === LoadingStatus.LOADING}
        >
          {t("buttonRegister")}
        </Button>
      </form>
    </Box>
  );
};

export default RegisterForm;
