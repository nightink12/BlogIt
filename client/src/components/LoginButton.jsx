import Google from "assets/images/icons/social-google.svg";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";

import useScriptRef from "hooks/useScriptRef";
import AnimateButton from "./AnimateButton";
import { LoginContext } from "../Helper/ContextProvider";
import jwt_decode from "jwt-decode";

import { Link } from "react-router-dom";

const handleMouseDownPassword = (event) => {
  event.preventDefault();
};

const LoginButton = () => {
  const googleHandler = async () => {
    //console.error("Login");
  };

  return (
    <>
      <Button
        component={Link}
        to={"/login"}
        disableElevation
        fullWidth
        onClick={googleHandler}
        size="large"
        variant="outlined"
        sx={{
          color: "black",
          backgroundColor: "#fafafa",
          borderColor: "whitesmoke",
          width: "auto",
        }}
      >
        <Box sx={{ mr: { xs: 1, sm: 2, width: 5 } }}>
          <img
            src={Google}
            alt="google"
            width={16}
            height={16}
            sx={{ marginTop: "10px" }}
          />
        </Box>
        Sign in
      </Button>

      <div id="signInDiv"></div>
    </>
  );
};

export default LoginButton;
