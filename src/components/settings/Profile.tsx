import React from "react";
import useTranslation from "next-translate/useTranslation";
import { Box, Button, Flex, FormControl, FormHelperText, FormLabel, Input, useToast } from "@chakra-ui/react";
import style from "./Settings.module.scss";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { PofileSettingsFormSchema } from "./validations";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { OurStore } from "../../redux/store";
import { updateUser } from "../../redux/slices/authSlice";
import { IUserUpdate } from "../../redux/types";


interface IFormInputs {
  email: string;
  firstName?: string,
  lastName?: string,
  // password?: string;
  // confirmPassword?: string;
}

const ProfileSettings: React.FC = () => {
  const { t } = useTranslation("settings");
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state: OurStore) => state.authReducer);
  const {
    register,
    handleSubmit,
    formState: { errors },

  } = useForm<IFormInputs>({
    mode: "onTouched",
    reValidateMode: "onSubmit",
    resolver: yupResolver(PofileSettingsFormSchema(t)),
    defaultValues: {
      firstName: user?.first_name,
      lastName: user?.last_name,
      email: user?.email,
    }
  });
  const toast = useToast();

  const onSubmit = async (value: IFormInputs) => {
    if (dispatch) {
      const data = {
        email: value.email,
        first_name: value.firstName,
        last_name: value.lastName
      } as IUserUpdate;
      const result = await dispatch(updateUser(data));
      if (updateUser.fulfilled.match(result)) {
        toast({ title: t("profileUpdateSuccess"), status: "success" });
      }
      else {
        toast({ title: t("profileUpdateError"), status: "error" });
      }
    }
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
          <FormLabel htmlFor='firstName'>{t("profileFirstNameLabel")}</FormLabel>
          <Input
            id="firstName"
            type="firstName"
            {...register("firstName")}
          />
          {errors.firstName && (
            <FormHelperText color="red">
              {errors.firstName.message && errors.firstName.message}
            </FormHelperText>
          )}
        </FormControl>
        <FormControl>
          <FormLabel htmlFor='lastName'>{t("profilelastNameLabel")}</FormLabel>
          <Input
            id="lastName"
            type="lastName"
            {...register("lastName")}
          />
          {errors.lastName && (
            <FormHelperText color="red">
              {errors.lastName.message && errors.lastName.message}
            </FormHelperText>
          )}
        </FormControl>
        {/* <FormControl>
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
        </FormControl> */}
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
