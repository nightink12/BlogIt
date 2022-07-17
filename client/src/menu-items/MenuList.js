// assets
import { IconBrandChrome, IconHelp } from "@tabler/icons";
import HomeIcon from "@mui/icons-material/Home";
import BadgeIcon from "@mui/icons-material/Badge";
import CreateIcon from "@mui/icons-material/Create";

import ChromeReaderModeIcon from "@mui/icons-material/ChromeReaderMode";

import ArticleIcon from "@mui/icons-material/Article";

import PersonIcon from "@mui/icons-material/Person";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import { LoginContext } from "Helper/ContextProvider";
// constant
const icons = { IconBrandChrome, IconHelp };

// ==============================|| SAMPLE PAGE & DOCUMENTATION MENU ITEMS ||============================== //

const other = {
  id: "sample-docs-roadmap",
  type: "group",
  children: [
    {
      id: "home",
      title: "Home",
      type: "item",
      url: "/",
      icon: HomeIcon,
      breadcrumbs: false,
    },

    {
      id: "about",
      title: "About",
      type: "item",
      url: "/about",
      icon: BadgeIcon,
      breadcrumbs: false,
    },

    {
      id: "posts",
      title: "Posts",
      type: "item",
      url: "/posts",
      icon: ArticleIcon,
      breadcrumbs: false,
    },

    {
      id: "profile",
      title: "My Profile",
      type: "item",
      url: "/profile",
      icon: PersonIcon,
      breadcrumbs: false,
    },

    {
      id: "createpost",
      title: "Create Post",
      type: "item",
      url: "/createpost",
      icon: CreateIcon,
      breadcrumbs: true,
    },
  ],
};

export default other;
