import React from "react";
import style from "./MainLayout.module.scss";
import { Box, Flex, Heading } from "@chakra-ui/react";
import Sidebar from "../Sidebar";
import { useRouter } from "next/router";
import { useAppSelector } from "../../redux/hooks";
import { OurStore } from "../../redux/store";
import { LoadingStatus } from "../../redux/types";


interface IMainLayoutProps {
  children: React.ReactNode;
  title?: string;
}

const MainLayout: React.FC<IMainLayoutProps> = ({ children, title }) => {
  const router = useRouter();
  const { loading, isAuthenticated } = useAppSelector((state: OurStore) => state.authReducer);

  if (typeof window !== "undefined" && loading !== LoadingStatus.LOADING && !isAuthenticated) {
    router.push("/login");
  }

  return (
    <React.Fragment>
      <Flex>
        <Sidebar />
        <Box className={style.container}>
          <Heading as="h1">{title}</Heading>
          <main>{children}</main>
        </Box>
      </Flex>
    </React.Fragment>
  );
};

export default MainLayout;
