import React from "react";
import useTranslation from "next-translate/useTranslation";
import style from "./login.module.scss";
import {
  Box,
  Text,
  Link,
  Flex,
  Spacer,
} from "@chakra-ui/react";
import LoginForm from "../../components/forms/login/LoginForm";
import RegisterForm from "../../components/forms/login/RegisterForm";
import { useRouter } from "next/router";
import { useAppSelector } from "../../redux/hooks";
import { OurStore } from "../../redux/store";
import LoginLayout from "../../components/layouts/LoginLayout";


export enum FormType {
  LOGIN = 1,
  REGISTER = 2,
};

const LoginPage: React.FC = () => {
  const { t } = useTranslation("login");
  const [formType, setFormType] = React.useState<FormType>(FormType.LOGIN);

  const router = useRouter();
  const { isAuthenticated } = useAppSelector((state: OurStore) => state.authReducer);

  const handleSwithForm = () => {
    setFormType(
      formType == FormType.LOGIN ? FormType.REGISTER : FormType.LOGIN
    );
  };

  if (typeof window !== "undefined" && isAuthenticated) {
    router.push("/expenses"); //TODO: Create and redirect to dashboard
  }

  return (
    <LoginLayout>
      <Box className={style.auth}>
        <Flex alignItems="baseline">
          <Text className={style.authTitle}>
            {formType === FormType.LOGIN
              ? t("titleLogin")
              : t("titleRegister")}
          </Text>
          <Spacer />
          <Link className={style.authSwitch} onClick={handleSwithForm}>
            {formType === FormType.LOGIN
              ? t("titleRegister")
              : t("titleLogin")}
          </Link>
        </Flex>
        {formType === FormType.LOGIN && <LoginForm />}
        {formType === FormType.REGISTER && <RegisterForm />}
      </Box>
    </LoginLayout>
  );
};

export default LoginPage;
