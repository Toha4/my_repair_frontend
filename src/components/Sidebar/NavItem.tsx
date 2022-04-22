import React from "react";
import NextLink from 'next/link'
import { Flex, Icon, Menu, MenuButton, Text, Link, useColorMode } from "@chakra-ui/react";
import { NavSize } from ".";
import style from "./Sidebar.module.scss";

interface INavItemProps {
  navSize: NavSize;
  title: string;
  href: string,
  icon: any;
  active?: boolean;
}

const GetColorMenuIcon = (colorMode?: string, isActive?: boolean) => {
  if (colorMode === "dark") {
    return isActive ? "white" : "brandBlue";
  }
  else {
    return isActive ? "gray.600" : "brandBlue";
  }
};

const NavItem: React.FC<INavItemProps> = ({ navSize, title, href, icon, active }) => {
  const { colorMode } = useColorMode();

  return (
    <>
      <Flex
        className={style.navItem}
        alignItems={navSize == NavSize.SMALL ? "center" : "flex-start"}
      >
        <Menu placement="right">
          <NextLink href={href} passHref>
            <Link
              className={style.navItemLink}
              _hover={{ textDecor: "none", backgroundColor: colorMode == "dark" ? "gray.500" : "gray.300" }}
              w={navSize == NavSize.LARGE ? "100%" : ""}
            >
              <MenuButton>
                <Flex alignItems="center">
                  <Icon as={icon} w="32px" h="32px" color={GetColorMenuIcon(colorMode, active)} />
                  <Text
                    className={style.navItemTitle}
                    fontWeight={active ? "900" : "400"}
                    display={navSize == NavSize.SMALL ? "none" : "flex"}
                  >
                    {title}
                  </Text>
                </Flex>
              </MenuButton>
            </Link>
          </NextLink>
        </Menu>
      </Flex>
    </>
  );
};

export default NavItem;
