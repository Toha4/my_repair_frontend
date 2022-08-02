import React from "react";
import useTranslation from "next-translate/useTranslation";
import style from "./LoginLayout.module.scss";
import { Box, Center, Flex, Heading, Spacer, useColorMode } from "@chakra-ui/react";
import NextLink from 'next/link';
import SiteSettings from "../common/SiteSettings";


interface ILoginLayoutProps {
  children: React.ReactNode;
}

const LoginLayout: React.FC<ILoginLayoutProps> = ({ children }) => {
  const { t } = useTranslation("login");
  const { colorMode } = useColorMode();

  const gradient =
    colorMode == "dark" ? "gray.600, gray.400" : "gray.400, gray.50";

  return (
    <React.Fragment>
      <Box
        className={style.background}
        bgGradient={`linear(to-bl, ${gradient})`}
      >
        <Box className={style.header}>
          <Flex>
            <Box>
              <NextLink href="/login">
                <Heading className={style.logo}>{t("common:logo")}</Heading>
              </NextLink>
            </Box>
            <Spacer />
            <Box mr="30px">
              <SiteSettings />
            </Box>
          </Flex>
        </Box>
        <Center h="calc(100% - 60px)" overflow="hidden;">
          <main>{children}</main>
        </Center>
      </Box>
    </React.Fragment>
  );
};

export default LoginLayout;
