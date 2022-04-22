import React from "react";
import useTranslation from "next-translate/useTranslation";
import style from "./login.module.scss";
import { Box, Text, Link, useColorMode, Flex, Spacer, Center, Heading } from "@chakra-ui/react";
import LoginForm from "../../components/forms/login/LoginForm";
import RegisterForm from "../../components/forms/login/RegisterForm";
import SiteSettings from "../../components/common/SiteSettings";

export enum FormType {
  LOGIN = 1,
  REGISTER = 2,
}

const LoginPage: React.FC = () => {
  const { t } = useTranslation("login");
  const { colorMode } = useColorMode();
  const [formType, setFormType] = React.useState<FormType>(FormType.LOGIN);

  const handleSwithForm = () => {
    setFormType(formType == FormType.LOGIN ? FormType.REGISTER : FormType.LOGIN);
  }

  const gradient = colorMode == "dark" ? "gray.600, gray.400" : "gray.400, gray.50";

  return (
    <>
      <Box className={style.background} bgGradient={`linear(to-bl, ${gradient})`}>
        <Box className={style.header}>
          <Flex>
            <Box>
              <Heading className={style.logo}>{t("common:logo")}</Heading>
            </Box>
            <Spacer />
            <Box mr="30px">
              <SiteSettings />
            </Box>
          </Flex>
        </Box>

        <Center h="calc(100% - 60px)" overflow="hidden;">
          <Box className={style.auth}>
            <Flex alignItems="baseline">
              <Text className={style.authTitle}>
                {formType === FormType.LOGIN ? t("titleLogin") : t("titleRegister")}
              </Text>
              <Spacer />
              <Link
                className={style.authSwitch}
                onClick={handleSwithForm}
              >
                {formType === FormType.LOGIN ? t("titleRegister") : t("titleLogin")}
              </Link>
            </Flex>
            {formType === FormType.LOGIN && <LoginForm />}
            {formType === FormType.REGISTER && <RegisterForm />}
          </Box>
        </Center>
      </Box>
    </>
  );
};

export default LoginPage;
