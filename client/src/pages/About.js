import * as React from "react";

import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Link } from "@mui/material";
import config from "config";
import Breadcrumb from "components/Breadcrumb";
import AuthFunc from "Helper/AuthFunc.js";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import { SocialIcon } from "react-social-icons";

import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  Stack,
  Typography,
} from "@mui/material";

import MainCard from "components/MainCard";

import { LoginContext } from "../Helper/ContextProvider";

import { userAuth, getUserSession, setUserSession } from "Helper/AuthFunc";
import CreatePostForm from "components/CreatePostForm";

import UploadCoverImage from "components/UploadCoverImage";

const About = () => {
  const isUserAuth = userAuth();

  return (
    <>
      <MainCard>
        <Box sx={{ p: 2 }}>
          <Typography variant="h1" component="h2">
            <center> About Us </center>
          </Typography>
          <hr />
          <br />
          <Typography variant="h4" component="h4">
            Blog It is a simple blogging app which was built keeping in mind the
            pure joy of writing a blog and waiting for it to make it to make
            it's way out for the world to read!!
          </Typography>
          <Typography variant="body1" component="h3">
            <i>
              Feel the urge to write or scribble something that's on your mind?
              Want to read posts written by people known and unknown alike? Do
              the shape of stories, sentences and words on a page excite you?
              Love how you give life to your story, your way?
            </i>
          </Typography>
          <br />
          <Typography variant="h4" component="h4">
            "There is no greater agony than bearing an untold story inside you"
            -Stephen King
          </Typography>
          <Typography variant="body1" component="h3">
            <i>
              Many of us have a writer within us, lying dormant and rusty. Many
              a times, a story, a sentence or perhaps even a word or two can
              make us feel the urge to give life to those thoughts. But it's not
              easy and <b>I know that</b>... <br></br>
              As a novice blogger, I kinda understand the many hurdles that come
              along with writing during the initial phases. Hence{" "}
              <b> BlogIt </b>was born, with a very simple, easy-to-use and
              intuitive layout with all the essential basic facilities present
              so that you can solely focus on writing.
            </i>
          </Typography>
          <br />
          <Typography variant="body1" component="h3">
            <i>
              Simply login with your Google account, and get started!! You can
              edit your posts at will, and also delete them if need be so. Also
              look out for the likes you receive on each post, they will help
              you stay motivated!!
            </i>
          </Typography>
          <br />
          <Typography variant="h4" component="h4">
            If you want to share any constructive criticisms and suggestions,
            you're more than welcome to contact me on my social handles!!
          </Typography>
          <br />
        </Box>
      </MainCard>
    </>
  );
};

export default About;
