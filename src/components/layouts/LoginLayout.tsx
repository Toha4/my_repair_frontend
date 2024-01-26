import React from "react";
import useTranslation from "next-translate/useTranslation";
import style from "./LoginLayout.module.scss";
import { Box, Center, Flex, Heading, Spacer, useColorMode } from "@chakra-ui/react";
import NextLink from "next/link";
import SiteSettings from "../common/SiteSettings";

interface ILoginLayoutProps {
  children: React.ReactNode;
}

const LoginLayout: React.FC<ILoginLayoutProps> = ({ children }) => {
  const { t } = useTranslation("login");
  const { colorMode } = useColorMode();

  const gradient = colorMode == "dark" ? "gray.600, gray.400" : "gray.400, gray.50";

  return (
    <React.Fragment>
      <Box minWidth="var(--minWidth)">
        <Box
          className={style.background}
          backgroundImage="url('/images/blue-print-house-with-constructor-hat.jpg')"
          backgroundPosition="center"
          backgroundRepeat="no-repeat"
          backgroundSize="cover"
        ></Box>
        <Box className={style.header}>
          <Flex>
            <Box>
              <NextLink href="/login">
                <Heading className={style.logo}>{t("common:logo")}</Heading>
              </NextLink>
            </Box>
            <Spacer />
            <Box mr="10px">
              <SiteSettings />
            </Box>
          </Flex>
        </Box>
        <Box height="calc(100vh - 60px)" overflow="hidden;">
          <main>{children}</main>
        </Box>
      </Box>
    </React.Fragment>
  );
};

export default LoginLayout;
