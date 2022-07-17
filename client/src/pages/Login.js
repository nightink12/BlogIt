import { Link, useNavigate } from "react-router-dom";
import dotenv from "dotenv";
import CryptoJS from "crypto-js";
import { useRef } from "react";
import { useScript } from "Helper/useScript";
useNavigate;
// material-ui
import { useTheme } from "@mui/material/styles";
import { Divider, Grid, Stack, Typography, useMediaQuery } from "@mui/material";
import { AES, enc } from "crypto-js";
// project imports
import AuthWrapper1 from "wrapper/AuthWrapper1";
import AuthCardWrapper from "wrapper/AuthCardWrapper";

import Logo from "components/Logo";

import React, { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";

import { LoginContext } from "../Helper/ContextProvider";
import { userAuth, getUserSession, setUserSession } from "Helper/AuthFunc";
import { Navigate, useLocation } from "react-router";
import axios from "axios";

dotenv.config();
//console.log(process.env.REACT_APP_BASEURL);
const baseURL = process.env.REACT_APP_BASEURL || "http://localhost:4000";

// ================================|| AUTH3 - LOGIN ||================================ //

const Login = () => {
  const { userlogged, setUserlogged } = React.useContext(LoginContext);
  const navigate = useNavigate();
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down("md"));
  const { state } = useLocation();
  const googlebuttonref = useRef();

  /*
  React.useEffect(() => {
    userlogged.email == "" ? null :getUser() 
  }, []);
*/

  const [userexist, setUserexist] = useState(false);

  function getUser(userlogged) {
    // console.log("Get User CALLED" + userlogged.email);
    // console.log(getUserSession().email);

    axios
      .get(`${baseURL}/users/email/` + getUserSession().email)
      .then((response) => {
        //console.log(response.data);

        if (response.data.length == 0) {
          saveUser(userlogged);
        }
      })
      .catch((err) => console.log(err));
  }

  function saveUser(userlogged) {
    axios
      .post(`${baseURL}/users`, userlogged)
      .then((response) => {})
      .catch((err) => console.log(err));
  }

  function handleCallbackResponse(response) {
    // console.log("Encoded JWT ID token: " + response.credential);

    var userContext = jwt_decode(response.credential);
    var userlogged = jwt_decode(response.credential);

    setUserlogged(userlogged);
    setUserSession(userlogged);

    const isUserAuth = userAuth();

    getUser(userlogged);

    navigate(state?.path || "/");
  }

  useScript("https://accounts.google.com/gsi/client", () => {
    window.google.accounts.id.initialize({
      client_id:
        "927054004126-lrifc7k81kl8mvhupcomagg2kh81e02s.apps.googleusercontent.com", // here's your Google ID
      callback: handleCallbackResponse,
      auto_select: false,
    });

    google.accounts.id.renderButton(
      document.getElementById("signInDivLoginPage"),
      { theme: "outline", size: "large" }
    );

    // google.accounts.id.prompt();
  });

  useEffect(() => {
    setUserlogged(userlogged);
  });

  return (
    <AuthWrapper1>
      <Grid
        container
        height="500px"
        direction="column"
        justifyContent="flex-end"
      >
        <Grid item xs={12}>
          <Grid container justifyContent="center" alignItems="center">
            <Grid item sx={{ m: { xs: 1, sm: 3 }, mb: 0 }}>
              <AuthCardWrapper>
                <Grid
                  container
                  spacing={2}
                  alignItems="center"
                  justifyContent="center"
                >
                  <Grid item sx={{ mb: 3 }}>
                    <Link to="#">
                      <Logo />
                    </Link>
                  </Grid>
                  <Grid item xs={12}>
                    <Grid
                      container
                      direction={matchDownSM ? "column-reverse" : "row"}
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Grid item>
                        <Stack
                          alignItems="center"
                          justifyContent="center"
                          spacing={1}
                        >
                          <Typography
                            color={theme.palette.secondary.main}
                            gutterBottom
                            variant={matchDownSM ? "h3" : "h2"}
                          >
                            Hi, Welcome!
                          </Typography>
                          <Typography
                            variant="caption"
                            fontSize="16px"
                            textAlign={matchDownSM ? "center" : "inherit"}
                          >
                            Sign in with Google to continue
                          </Typography>

                          <div id="signInDivLoginPage"></div>
                        </Stack>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </AuthCardWrapper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </AuthWrapper1>
  );
};

export default Login;
