
type colorMode = "dark" | "light";

export interface IIconProps {
  colorMode?: colorMode,
};

export interface IIconMenuProp extends IIconProps {
  isActive?: boolean,
}