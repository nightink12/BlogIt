import * as React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import TitleBreadBar from "./TitleBreadBar";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import Avatar from "@mui/material/Avatar";

import coverphoto from "assets/images/profile_cover.jpg";
import avatar from "assets/images/profile_avatar.png";
import { Divider, Stack } from "@mui/material";
import { styled } from "@mui/material/styles";
import CardHeader from "@mui/material/CardHeader";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { userAuth, getUserSession, setUserSession } from "Helper/AuthFunc";

const cover_paper = {
  backgroundColor: "white",
  color: "rgb(97, 97, 97)",
  transition: "box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
  boxShadow: "none",
  backgroundImage: "none",
  borderRadius: "8px",
  overflow: "hidden",
  border: "1px solid #90caf975",
};

const gridstyle1 = {
  boxSizing: "border-box",
  display: "flex",
  flexFlow: "row wrap",
  marginTop: "-24px",
  width: "calc(100% + 24px)",
  marginLeft: "-24px",
};
const avatarbox = {
  webkitFontSmoothing: "antialiased",
  textSizeAdjust: "100%",
  fontWeight: "400",
  boxSizing: "inherit",
  position: "relative",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: "0",
  fontFamily: "Roboto, sans-serif",
  fontSize: "1.25rem",
  lineHeight: "1",
  overflow: "hidden",
  userSelect: "none",
  color: "rgb(30, 136, 229)",
  background: "rgb(144, 202, 249)",
  margin: "-70px 0px 0px auto",

  width: "140px",
  height: "140px",
};

const avatarphoto = {
  WebkitFontSmoothing: "antialiased",
  textSizeAdjust: "100%",
  fontWeight: "400",
  fontFamily: "Roboto, sans-serif",
  fontSize: "1.25rem",
  lineHeight: "1",
  userSelect: "none",
  boxSizing: "inherit",
  width: "100%",
  height: "100%",
  textAlign: "center",
  objectFit: "cover",
  color: "transparent",
  textIndent: "10000px",
};

const containeravatar = {
  boxSizing: "border-box",
  display: "flex",
  flexFlow: "row wrap",
  marginTop: "-100px",

  marginLeft: "10%",
};
const avatardesc = {
  WebkitFontSmoothing: "antialiased",
  textSizeAdjust: "100%",
  color: "white",
  fontFamily: "Roboto, sans-serif",

  boxSizing: "border-box",
  display: "flex",
  flexFlow: "row wrap",
  marginTop: "0px",
};

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function ProfileHeader() {
  //obtain details of user in current session
  const userName = getUserSession().name;
  const userEmail = getUserSession().email;
  const userAvatar = getUserSession().picture;

  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <>
      <Grid item xs={12}>
        <Card>
          <CardMedia component="img" height="250" image={coverphoto} />
          <CardHeader
            avatar={
              <Avatar
                sx={{ bgcolor: red[500] }}
                src={userAvatar}
                aria-label="recipe"
                variant="square"
                style={avatarphoto}
              ></Avatar>
            }
            title={
              <>
                <Typography variant="h2" style={avatardesc}>
                  {userName}
                </Typography>
              </>
            }
            subheader=""
            style={containeravatar}
          />
        </Card>
      </Grid>
    </>
  );
}
