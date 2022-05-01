import React from "react";
import useTranslation from "next-translate/useTranslation";
import { Box, Button, Flex, FormControl, FormHelperText, FormLabel, Input } from "@chakra-ui/react";
import style from "./Settings.module.scss";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { PofileSettingsFormSchema } from "../../utils/validations";

interface IFormInputs {
  email: string;
  password?: string;
  confirmPassword?: string;
}

const ProfileSettings: React.FC = () => {
  const { t } = useTranslation("settings");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>({
    mode: "onTouched",
    reValidateMode: "onSubmit",
    resolver: yupResolver(PofileSettingsFormSchema(t)),
  });

  const onSubmit = (value: IFormInputs) => {
    console.log("value: ", value);
  };

  return (
    <Box className={style.settingBox}>
      <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
        <FormControl>
          <FormLabel htmlFor='email'>{t("profileEmailLabel")}</FormLabel>
          <Input
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
          <FormLabel htmlFor='password'>{t("profilePasswordLabel")}</FormLabel>
          <Input
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
          <FormLabel htmlFor='confirm-password'>{t("profileConfirmPasswordLabel")}</FormLabel>
          <Input
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
        <Flex >
          <Button
            marginLeft="auto"
            type="submit"
            variant="brandSolid"
          >
            {t("profileSaveButton")}
          </Button>
        </Flex>
      </form>
    </Box>
  );
};

export default ProfileSettings;
