import React from "react";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import {
  Avatar,
  Box,
  Divider,
  Flex,
  Heading,
  IconButton,
  Spacer,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import style from "./Sidebar.module.scss";
import {
  HideSidebarIcon,
  ExpensesIcon,
  PlansIcon,
  BlogIcon,
  StatisticsIcon,
  SettingsIcon,
  LogoutIcon,
} from "../Icons";
import NavItem from "./NavItem";
import SiteSettings from "../common/SiteSettings";
import { getLocalStorage, setLocalStorage } from "../../utils/localStorage";

export enum NavSize {
  LARGE = 1,
  SMALL = 2,
}

const Sidebar: React.FC = () => {
  const { t } = useTranslation("common");
  const { colorMode } = useColorMode();
  const [navSize, changeNavSize] = React.useState<NavSize>(NavSize.LARGE);

  if (typeof window !== "undefined") {
    React.useLayoutEffect(() => {
      if (getLocalStorage("navSize")) {
        changeNavSize(parseInt(getLocalStorage("navSize") || ""));
      }
    }, []);
  }

  React.useEffect(() => {
    setLocalStorage("navSize", navSize.toString());
  }, [navSize]);

  const router = useRouter();

  const handleClickNavSize = () => {
    changeNavSize(navSize == NavSize.LARGE ? NavSize.SMALL : NavSize.LARGE);
  };

  const handleLogout = () => {
    console.log("logout!");
  };

  const menuItems = [
    {
      href: "/expenses",
      title: t("titleExpenses"),
      icon: ExpensesIcon,
    },
    {
      href: "/plans",
      title: t("titlePlans"),
      icon: PlansIcon,
    },
    {
      href: "/blog",
      title: t("titleBlog"),
      icon: BlogIcon,
    },
    {
      href: "/statistics",
      title: t("titleStatistics"),
      icon: StatisticsIcon,
    },
    {
      href: "/settings",
      title: t("titleSettings"),
      icon: SettingsIcon,
    },
  ];

  return (
    <>
      <Flex
        className={style.sidebar}
        w={navSize === NavSize.SMALL ? "54px" : "200px"}
        minW={navSize === NavSize.SMALL ? "54px" : "200px"}
      >
        <Flex className={style.menu} as="nav">
          <Flex className={style.header}>
            <IconButton
              aria-label="Show menu"
              variant="iconButton"
              icon={<HideSidebarIcon colorMode={colorMode} navSize={navSize} />}
              onClick={handleClickNavSize}
            />
            <Heading
              className={style.title}
              display={navSize === NavSize.SMALL ? "none" : "flex"}
            >
              {t("logo")}
            </Heading>
          </Flex>
          <Divider borderColor="brandBlue" />
          <Box className={style.menuPanel}>
            {menuItems.map(({ href, title, icon }) => (
              <NavItem
                key={title}
                href={href}
                navSize={navSize}
                icon={icon}
                title={title}
                active={router.asPath === href}
              />
            ))}
          </Box>
        </Flex>

        <Flex className={style.userPanel}>
          <Divider borderColor="brandBlue" />
          <Box m="12px">
            <SiteSettings hideLanguageSwitch={navSize === NavSize.SMALL} />
          </Box>
          <Flex className={style.user}>
            <Avatar size="sm" name="Anton Marusin" />
            <Flex
              className={style.userName}
              display={navSize === NavSize.SMALL ? "none" : "flex"}
            >
              <Text>Anton</Text>
              <Spacer />
              <IconButton
                pr="6px"
                aria-label="logout"
                variant="iconButton"
                icon={<LogoutIcon w="32px" h="32px" />}
                onClick={handleLogout}
              />
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};

export default Sidebar;
