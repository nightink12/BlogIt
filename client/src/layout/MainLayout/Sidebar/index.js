import PropTypes from "prop-types";

// material-ui
import { useTheme } from "@mui/material/styles";
import { Box, Drawer, useMediaQuery } from "@mui/material";

// third-party
import PerfectScrollbar from "react-perfect-scrollbar";
import { BrowserView, MobileView } from "react-device-detect";

// project imports
import MenuList from "./MenuList";
import LogoSection from "components/Logo";
import { SocialIcon } from "react-social-icons";

import { drawerWidth } from "store/constant";

// ==============================|| SIDEBAR DRAWER ||============================== //

const Sidebar = ({ drawerOpen, drawerToggle, window }) => {
  const theme = useTheme();
  const matchUpMd = useMediaQuery(theme.breakpoints.up("md"));

  const drawer = (
    <>
      <Box sx={{ display: { xs: "block", md: "none" } }}>
        <Box sx={{ display: "flex", p: 2, mx: "auto" }}>
          <LogoSection />
        </Box>
      </Box>
      <BrowserView>
        <PerfectScrollbar
          component="div"
          style={{
            height: !matchUpMd ? "calc(100vh - 56px)" : "calc(100vh - 88px)",
            paddingLeft: "16px",
            paddingRight: "16px",
          }}
        >
          {/*<SignInButton/> */}

          <MenuList />
          <Box
            sx={{
              display: "flex",
              justiyContent: "space-between",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <SocialIcon
              url="https://www.linkedin.com/in/tuhin-mondal-987281224/"
              style={{ height: 40, width: 40 }}
            />
            <span> &nbsp; </span>
            <span> &nbsp; </span>
            <SocialIcon
              url="https://github.com/nightink12"
              style={{ height: 40, width: 40 }}
            />
            <span> &nbsp; </span>
            <span> &nbsp; </span>
            <SocialIcon
              url="https://www.instagram.com/tuhinthinking123/"
              style={{ height: 40, width: 40 }}
            />
            <span> &nbsp; </span>
            <span> &nbsp; </span>
            <SocialIcon
              url="mailto:tuhinchess@gmail.com"
              style={{ height: 40, width: 40 }}
            />
          </Box>
        </PerfectScrollbar>
      </BrowserView>

      <MobileView>
        <Box sx={{ px: 2 }}>
          <MenuList />
        </Box>
      </MobileView>
    </>
  );

  const container =
    window !== undefined ? () => window.document.body : undefined;

  return (
    <Box
      component="nav"
      sx={{ flexShrink: { md: 0 }, width: matchUpMd ? drawerWidth : "auto" }}
      aria-label="mailbox folders"
    >
      <Drawer
        container={container}
        variant={matchUpMd ? "persistent" : "temporary"}
        anchor="left"
        open={drawerOpen}
        onClose={drawerToggle}
        sx={{
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            background: theme.palette.background.default,
            color: theme.palette.text.primary,
            borderRight: "none",
            [theme.breakpoints.up("md")]: {
              top: "88px",
            },
          },
        }}
        ModalProps={{ keepMounted: false }}
        color="inherit"
      >
        {drawer}
      </Drawer>
    </Box>
  );
};

Sidebar.propTypes = {
  drawerOpen: PropTypes.bool,
  drawerToggle: PropTypes.func,
  window: PropTypes.object,
};

export default Sidebar;
