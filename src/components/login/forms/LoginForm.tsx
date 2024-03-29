import React, { useEffect } from "react";
import useTranslation from "next-translate/useTranslation";

import style from "../login.module.scss";
import { FormControl, FormHelperText, Input, Box, Button, Flex, Spacer, useToast, Tooltip } from "@chakra-ui/react";
import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import { LoginFormSchema } from "./validations";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { OurStore } from "../../../redux/store";
import { login, reset as resetAction } from "../../../redux/slices/authSlice";
import { ILogin, LoadingStatus } from "../../../redux/types";

interface IFormInputs {
  emailOrUsername: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const { t } = useTranslation("login");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormInputs>({
    mode: "onSubmit",
    reValidateMode: "onChange",
    resolver: yupResolver(LoginFormSchema(t)),
  });

  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state: OurStore) => state.authReducer);

  const toast = useToast();
  useEffect(() => {
    if (error) {
      const message = error.code === "ERR_BAD_REQUEST" ? t("invalidCreditals") : error.message;
      toast({ title: message, status: "error" });

      reset({ password: "" });
      dispatch(resetAction());
    }
  }, [error]);

  const onSubmit = (value: IFormInputs) => {
    if (dispatch) {
      const data = {
        emailOrUsername: value.emailOrUsername,
        password: value.password,
      } as ILogin;
      dispatch(login(data));
    }
  };

  const handleLoginVkontakte = () => {
    console.log("Enter VK");
  };

  const handleLoginGoogle = () => {
    console.log("Enter Google");
  };

  return (
    <Box>
      <form className={style.loginForm} onSubmit={handleSubmit(onSubmit)}>
        <FormControl>
          <Input placeholder={t("common:emailOrUsername")} id="emailOrUsername" {...register("emailOrUsername")} />
          {errors.emailOrUsername && (
            <FormHelperText color="red">
              {errors.emailOrUsername.message && errors.emailOrUsername.message}
            </FormHelperText>
          )}
        </FormControl>
        <FormControl>
          <Input placeholder={t("common:password")} id="password" type="password" {...register("password")} />
          {errors.password && (
            <FormHelperText color="red">{errors.password.message && errors.password.message}</FormHelperText>
          )}
        </FormControl>
        <Button type="submit" variant="brandSolid" width="100%" isLoading={loading === LoadingStatus.LOADING}>
          {t("titleLogin")}
        </Button>
        <Flex gap="7.5px">
          <Tooltip label="In development">
            <Button onClick={handleLoginVkontakte} variant="brandOutline" width="50%" isDisabled>
              <img src="/static/svg/logo_vk.svg" alt="logo" />
              <Box ml="10px">{t("buttonVk")}</Box>
            </Button>
          </Tooltip>
          <Spacer />
          <Tooltip label="In development">
            <Button onClick={handleLoginGoogle} variant="brandOutline" width="50%" isDisabled>
              <img src="/static/svg/logo_google.svg" alt="logo" />
              <Box ml="10px">Google</Box>
            </Button>
          </Tooltip>
        </Flex>
      </form>
    </Box>
  );
};

export default LoginForm;
