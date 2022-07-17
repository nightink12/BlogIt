import PropTypes from "prop-types";
import React, { component } from "react";

// material-ui
import { useTheme } from "@mui/material/styles";
import { Avatar, Box, ButtonBase } from "@mui/material";

// project imports
import LogoSection from "../../../components/Logo";

import ProfileSection from "./ProfileSection";

import LoginButton from "../../../components/LoginButton";

// assets
import { IconMenu2 } from "@tabler/icons";
import { LoginContext } from "../../../Helper/ContextProvider";
import { userAuth, getUserSession, setUserSession } from "Helper/AuthFunc";

import { Route, Link, Routes, useLocation } from "react-router-dom";

import Breadcrumb from "components/Breadcrumb";
const state = {
  visible: false,
};

// ==============================|| MAIN NAVBAR / HEADER ||============================== //

const Header = ({ handleLeftDrawerToggle, props }) => {
  const theme = useTheme();

  const { userlogged, setUserlogged } = React.useContext(LoginContext);
  const location = useLocation();
  var locationBreadcrumb = location.pathname.slice(1);

  locationBreadcrumb =
    locationBreadcrumb.charAt(0).toUpperCase() + locationBreadcrumb.slice(1);

  const isUserAuth = userAuth();

  return (
    <>
      {/* logo & toggler button */}
      <Box
        sx={{
          width: 228,
          display: "flex",
          [theme.breakpoints.down("md")]: {
            width: "auto",
          },
        }}
      >
        <Box
          component="span"
          sx={{ display: { xs: "none", md: "block" }, flexGrow: 1 }}
        >
          <LogoSection />
        </Box>

        <ButtonBase sx={{ borderRadius: "12px", overflow: "hidden" }}>
          <Avatar
            variant="rounded"
            sx={{
              ...theme.typography.commonAvatar,
              ...theme.typography.mediumAvatar,
              transition: "all .2s ease-in-out",
              background: theme.palette.secondary.light,
              color: theme.palette.secondary.dark,
              "&:hover": {
                background: theme.palette.secondary.dark,
                color: theme.palette.secondary.light,
              },
            }}
            onClick={handleLeftDrawerToggle}
            color="inherit"
          >
            <IconMenu2 stroke={1.5} size="1.3rem" />
          </Avatar>
        </ButtonBase>
      </Box>

      {/* header search */}

      {locationBreadcrumb != "" && (
        <Breadcrumb label={`${locationBreadcrumb.substring(0, 20).trim()}`} />
      )}

      <Box sx={{ flexGrow: 1 }} />
      <Box sx={{ flexGrow: 1 }} />

      {/* notification & profile */}

      {isUserAuth ? null : <LoginButton />}

      {isUserAuth ? <ProfileSection /> : null}
    </>
  );
};
Header.propTypes = {
  handleLeftDrawerToggle: PropTypes.func,
};

export default Header;
