import { Icon } from "@/components/icon";
import { createElement } from "react";

export const navItems = [
  // {
  //   title: "Artists",
  //   link: "/dashboard/artists",
  //   icon: createElement(Icon, { icon: "mic" }),
  // },
  {
    title: "Songs",
    link: "/dashboard/songs",
    icon: createElement(Icon, { icon: "disc" }),
  },
  {
    title: "Genres",
    link: "/dashboard/genres",
    icon: createElement(Icon, { icon: "grid" }),
  },
];
