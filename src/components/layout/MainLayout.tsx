import React from "react";
import style from "./MainLayout.module.scss";
import { Box, Flex, Heading } from "@chakra-ui/react";
import Sidebar from "../Sidebar";


interface IMainLayoutProps {
  children: any,
  title?: string;
}

const MainLayout: React.FC<IMainLayoutProps> = ({ children, title }) => {
  return (
    < React.Fragment >
      <Flex>
        <Sidebar />
        <Box className={style.container}>
          <Heading as="h1">
            {title}
          </Heading>
          <main>{children}</main>
        </Box>
      </Flex>
    </React.Fragment>
  )
};

export default MainLayout;