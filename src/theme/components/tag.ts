import { tagAnatomy as parts } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers, defineStyle } from "@chakra-ui/react";

const { defineMultiStyleConfig, definePartsStyle } = createMultiStyleConfigHelpers(parts.keys);

const baseStyleContainer = defineStyle({
  borderRadius: "brand",
});

const baseStyle = definePartsStyle({
  container: baseStyleContainer,
});

const Tag = defineMultiStyleConfig({
  baseStyle: baseStyle,
  defaultProps: {
    size: "md",
    variant: "subtle",
    colorScheme: "gray",
  },
});

export default Tag;
