import * as React from "react";
import { useState } from "react";
import { Route, Link, Routes, useParams } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import ChromeReaderModeOutlinedIcon from "@mui/icons-material/ChromeReaderModeOutlined";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import MainCard from "components/MainCard";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { Button } from "@mui/material";
import DefaultCoverImage from "assets/img/default_cover.png";

import postimg from "assets/img/post.jpg";

import ThumbUpRoundedIcon from "@mui/icons-material/ThumbUpRounded";
import axios from "axios";
import { userAuth, getUserSession, setUserSession } from "Helper/AuthFunc";
import moment from "moment";

import ProfileHeader from "components/ProfileHeader";
import dotenv from "dotenv";

dotenv.config();
const baseURL = process.env.REACT_APP_BASEURL || "http://localhost:4000";

const Profile = () => {
  const params = useParams();

  const userID = getUserSession().name;

  const userName = getUserSession().name;
  const userEmail = getUserSession().email;
  const userAvatar = getUserSession().picture;

  const [allBlogs, getAllBlogs] = useState([]);
  const [expanded, setExpanded] = React.useState(true);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    getBlog();
  }, []);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const isUserAuth = userAuth();

  const getBlog = () => {
    //console.log("Get DATA Called");
    setLoading(true);
    axios
      .get(`${baseURL}/posts/author/` + userEmail)
      .then((response) => {
        //console.log("GET CAlled for AUTHOR");
        //console.log(response.data);

        const allBlogResp = response.data;

        //setPost(response.data)
        getAllBlogs(allBlogResp);
        setLoading(false);
      })

      .catch((err) => console.log(err));
  };

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  if (!loading) {
    return (
      <>
        <ProfileHeader />

        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            "& > :not(style)": {
              m: 1,

              width: "350px",
            },
          }}
        >
          {allBlogs.map((allBlog) => (
            <Paper elevation={3} key={allBlog._id}>
              <Card sx={{ maxWidth: 345 }}>
                <CardHeader
                  avatar={
                    <Avatar
                      src={allBlog.author_avatar}
                      sx={{ bgcolor: red[500] }}
                      aria-label="recipe"
                    ></Avatar>
                  }
                  title={allBlog.author_name}
                  subheader={moment(allBlog.createdAt)
                    .utcOffset("+05:30")
                    .format("Do MMMM YYYY")}
                />
                <CardMedia
                  component="img"
                  height="150"
                  image={
                    allBlog.coverimg ? allBlog.coverimg : DefaultCoverImage
                  }
                  alt=""
                />
                <CardContent
                  style={{ marginTop: "auto" }}
                  sx={{ height: "300px" }}
                >
                  <Typography variant="h2" color="text.black">
                    {allBlog.title.length > 70
                      ? allBlog.title.substring(0, 70).trim() + "..."
                      : allBlog.title}
                  </Typography>

                  <hr />
                  <Typography
                    variant="paragraph"
                    color="text.black"
                    align="justify"
                  >
                    <span
                      dangerouslySetInnerHTML={{
                        __html: allBlog.body.substring(0, 400).trim() + "...",
                      }}
                    ></span>
                  </Typography>
                </CardContent>
                <CardActions
                  sx={{
                    display: "flex",
                    justiyContent: "space-between",
                    flexDirection: "column",
                    justifyContent: "flex-end",
                    alignItems: "flex-end",
                  }}
                >
                  <Button
                    component={Link}
                    to={"/postdetails/" + allBlog._id}
                    variant="contained"
                    startIcon={<ChromeReaderModeOutlinedIcon />}
                  >
                    Read More....
                  </Button>
                </CardActions>
              </Card>
            </Paper>
          ))}
        </Box>
      </>
    );
  } else
    return (
      <>
        <ProfileHeader />
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="100vh"
        >
          <CircularProgress color="secondary" size="10rem" />
        </Box>
      </>
    );
};

export default Profile;
