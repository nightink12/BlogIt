import * as React from "react";
import { Route, Link, Routes, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import moment from "moment";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Stack, Button } from "@mui/material";
import DefaultCoverImage from "assets/img/default_cover.png";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import ToggleButton from "@mui/material/ToggleButton";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Badge from "@mui/material/Badge";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Alert from "@mui/material/Alert";
import postimg from "assets/img/post.jpg";
import dotenv from "dotenv";

import ThumbUpRoundedIcon from "@mui/icons-material/ThumbUpRounded";
import axios from "axios";
import { userAuth, getUserSession, setUserSession } from "Helper/AuthFunc";

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

dotenv.config();
const baseURL = process.env.REACT_APP_BASEURL || "http://localhost:4000";

export default function PostDetails(props) {
  //For Confirm Pop Up
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setOpenDelAlert(false);
    setOpenUpdAlert(false);
  };
  ///
  const [openDelAlert, setOpenDelAlert] = React.useState(false);
  const [openUpdAlert, setOpenUpdAlert] = React.useState(false);

  const params = useParams();

  const [newcolor, setNewcolor] = useState("");
  const [matchlikedpost, setMatchlikedpost] = useState(false);
  const [likescount, setLikescount] = useState("");

  const [singleBlog, getSingleBlog] = useState("");

  const [expanded, setExpanded] = React.useState(true);

  React.useEffect(() => {
    getBlog();
  }, []);

  React.useEffect(() => {
    singleBlog == "" ? null : likefuncget();
  }, [singleBlog]);

  React.useEffect(() => {
    singleBlog == "" ? null : getLikeCount();
  }, [singleBlog]);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const isUserAuth = userAuth();

  const getBlog = () => {
    // console.log("Get Called")
    axios
      .get(`${baseURL}/posts/` + params.id)
      .then((response) => {
        const singleBlogResp = response.data;
        //console.log(response.data);

        //setPost(response.data)
        getSingleBlog(singleBlogResp);
      })

      .catch((err) => console.log(err));
  };

  const handleConfirm = () => {
    axios
      .delete(`${baseURL}/posts/` + params.id)
      .then((response) => {
        //console.log(response);

        setOpen(false);

        setOpenDelAlert(true);
        setTimeout(() => {
          window.location = "/profile";
        }, 800);
      })

      .catch((err) => console.log(err));
  };

  const [counterInfo, setCounterInfo] = useState({
    likedbyauth: getUserSession().email,
  });

  function likefuncget() {
    //console.log("likefuncget CALLED" + singleBlog._id);
    //console.log(getUserSession().email);

    axios
      .get(
        `${baseURL}/posts/like/` + singleBlog._id + "/" + getUserSession().email
      )
      .then((response) => {
        // console.log(response.data[0]._id, "==", singleBlog._id);
        //console.log("BEFORE GET MATCH LIKE" + matchlikedpost);
        //console.log("DATA FETCHED Through GET" + response.data);
        //console.log(response.data);

        if (response.data.length > 0) {
          if (response.data[0]._id == singleBlog._id) {
            //console.log("LIKED MATCHED");
            setMatchlikedpost(true);
            setNewcolor("info");
          } else {
            setMatchlikedpost(false);
            setNewcolor("");
          }
        }
      })
      .catch((err) => console.log(err));
  }

  //Get Like Count

  function getLikeCount() {
    //console.log("getLikeCount CALLED" + singleBlog._id);
    //console.log(getUserSession().email);

    axios
      .get(`${baseURL}/posts/likecount/` + singleBlog._id)
      .then((response) => {
        //console.log(response.data);
        setLikescount(response.data[0].likes);
      })
      .catch((err) => console.log(err));
  }

  function likepost() {
    //console.log("LIKE CALLED");

    axios
      .post(`${baseURL}/posts/like/` + singleBlog._id, counterInfo)
      .then((response) => {
        //console.log(response.data);

        setMatchlikedpost(true);
        getLikeCount();
      })
      .catch((err) => console.log(err));
  }

  function unlikepost() {
    //console.log("UNLIKE CALLED");

    axios
      .post(`${baseURL}/posts/unlike/` + singleBlog._id, counterInfo)
      .then((response) => {
        //console.log(response.data);

        setMatchlikedpost(false);
        getLikeCount();
      })
      .catch((err) => console.log(err));
  }

  function likeHandle() {
    newcolor == "" ? setNewcolor("info") : setNewcolor("");

    matchlikedpost ? unlikepost() : likepost();
  }
  const shapeStyles = { bgcolor: "primary.main", width: 40, height: 40 };
  return (
    <>
      <Card>
        <CardHeader
          avatar={
            <Avatar
              src={singleBlog.author_avatar}
              sx={{ bgcolor: red[500] }}
              aria-label="recipe"
            ></Avatar>
          }
          action={
            singleBlog.author_email == getUserSession().email && (
              <Stack direction="row" spacing={2}>
                <Button
                  onClick={handleClickOpen}
                  color="secondary"
                  variant="contained"
                  startIcon={<DeleteIcon />}
                >
                  Delete
                </Button>

                <Button
                  component={Link}
                  to={"/editpost/" + singleBlog._id}
                  variant="contained"
                  startIcon={<EditIcon />}
                >
                  Edit
                </Button>
              </Stack>
            )
          }
          title={singleBlog.author_name}
          subheader={moment(singleBlog.createdAt)
            .utcOffset("+05:30")
            .format("dddd, MMMM Do YYYY, h:mm:ss A")}
        />
        <CardMedia
          component="img"
          height="294"
          image={singleBlog.coverimg ? singleBlog.coverimg : DefaultCoverImage}
          alt="Paella dish"
        />
        <CardContent>
          <Typography variant="h2" color="text.black">
            {singleBlog.title}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <Badge
            badgeContent={likescount}
            color="primary"
            overlap="circular"
            max={999}
            variant="string"
          >
            <IconButton aria-label="add to favorites" onClick={likeHandle}>
              <ThumbUpRoundedIcon fontSize="large" color={newcolor} />
            </IconButton>
          </Badge>

          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <div
              dangerouslySetInnerHTML={{
                __html: singleBlog.body,
              }}
            ></div>
          </CardContent>
        </Collapse>
      </Card>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Do you want to Delete the Post ?"}
        </DialogTitle>

        <DialogActions>
          <Button onClick={handleConfirm}>Yes</Button>
          <Button onClick={handleClose} autoFocus>
            No
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={openDelAlert}
        sx={{ backgroundColor: "#2e7d32" }}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <Alert
          onClose={handleClose}
          sx={{ width: "100%", backgroundColor: "#2e7d32", color: "white" }}
        >
          Post Deleted Successfully!
        </Alert>
      </Snackbar>

      <Snackbar
        open={openUpdAlert}
        sx={{ backgroundColor: "#2e7d32" }}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <Alert
          onClose={handleClose}
          sx={{ width: "100%", backgroundColor: "#2e7d32", color: "white" }}
        >
          Post Updated Successfully!
        </Alert>
      </Snackbar>
    </>
  );
}
