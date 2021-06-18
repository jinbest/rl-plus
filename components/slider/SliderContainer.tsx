import React from "react";
import { Flex, FlexProps } from "@react-yuki/ui";

export const SlideContainer = (props: FlexProps) => (
  <Flex
    {...props}
    __css={{
      position: "relative",
      ".swiper-container": {
        width: "100vw",
        height: "500px"
      }
    }}
  />
);
