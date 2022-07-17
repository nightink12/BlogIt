import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import PhotoCamera from "@mui/icons-material/PhotoCamera";

import SendIcon from "@mui/icons-material/Send";
import { styled } from "@mui/material/styles";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
// material-ui
import { useTheme } from "@mui/material/styles";
import { userAuth, getUserSession, setUserSession } from "Helper/AuthFunc";

import {
  Card,
  Box,
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
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";

// third party
import * as Yup from "yup";
import { Formik } from "formik";

import axios from "axios";

// project imports
import useScriptRef from "hooks/useScriptRef";
import Google from "assets/images/icons/social-google.svg";
import AnimateButton from "components/AnimateButton";
import sanitizeHtml from "sanitize-html";
import ImageUploader from "react-images-upload";
// assets
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import MainCard from "components/MainCard";
import dotenv from "dotenv";
import Button from "@mui/material/Button";

import DefaultCoverImage from "assets/img/default_cover.png";

import e from "cors";
import React, { useEffect, useRef } from "react";
import { setDate } from "date-fns/esm";

dotenv.config();
const baseURL = process.env.REACT_APP_BASEURL || "http://localhost:4000";

const CreatePostForm = ({ blogPostId, setBlogPostId }) => {
  const [blogInfo, setBlogInfo] = useState({
    title: "",
    body: "",
    author_name: "",
    author_email: "",
    author_avatar: "",
    coverimg: "",
  });

  const [openUpCreateAlert, setOpenUpCreateAlert] = React.useState(false);
  const [editorLoaded, setEditorLoaded] = useState(false);
  const [data, setData] = useState("");

  const handleClose = () => {
    setOpenUpCreateAlert(false);
  };

  useEffect(() => {
    setEditorLoaded(true);
  }, []);

  const Input = styled("input")({
    display: "none",
  });

  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down("md"));
  const scriptedRef = useScriptRef();
  const customization = useSelector((state) => state.customization);
  const user = getUserSession().name;

  const editorRef = useRef();
  const { CKEditor, ClassicEditor } = editorRef.current || {};
  const imageUploadConfig = {
    types: ["jpeg"],
  };
  useEffect(() => {
    editorRef.current = {
      CKEditor: require("@ckeditor/ckeditor5-react").CKEditor, // v3+
      ClassicEditor: require("@ckeditor/ckeditor5-build-classic"),
    };
  }, []);

  const userName = getUserSession().name;
  const userEmail = getUserSession().email;
  const userAvatar = getUserSession().picture;

  function handleSubmit(e) {
    e.preventDefault();

    // If the post body is too short, do not submit
    if (blogInfo.body.length < 75) {
      alert("Cannot submit such a short post!");
    } else {
      axios
        .post(`${baseURL}/posts/`, blogInfo)
        .then((response) => {
          // console.log(response.data)
          setOpenUpCreateAlert(true);
          setTimeout(() => {
            window.location = "/postdetails/" + response.data;
          }, 400);
        })
        .catch((err) => console.log(err));
    }
  }

  function handleEditorChange(e, editor) {
    const data = editor.getData();
    setBlogInfo({ ...blogInfo, body: data });
  }

  function onDrop(pictureFiles, pictureDataURLs) {
    const coverImage = pictureDataURLs[0];
    // console.log(pictureDataURLs[0])
    setBlogInfo({ ...blogInfo, coverimg: coverImage });
  }

  return (
    <>
      <Card>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={matchDownSM ? 0 : 2}>
            <Grid item xs={12} sm={12}>
              <TextField
                inputProps={{ style: { fontSize: 25 } }}
                InputLabelProps={{ style: { fontSize: 25 } }}
                id="standard-basic"
                label="Post Title"
                variant="standard"
                fullWidth
                onChange={(e) =>
                  setBlogInfo({
                    ...blogInfo,
                    title: e.target.value,
                    author_name: userName,
                    author_email: userEmail,
                    author_avatar: userAvatar,
                  })
                }
              />
            </Grid>

            <Grid item xs={12} sm={12}>
              <ImageUploader
                withIcon={true}
                withPreview={true}
                buttonText="Choose Blog Cover Image"
                onChange={onDrop}
                imgExtension={[".jpg", ".gif", ".png", ".gif"]}
                maxFileSize={5242880}
                singleImage={true}
              />
            </Grid>

            <Grid item xs={12} sm={12}>
              <div>
                {editorLoaded ? (
                  <CKEditor
                    type=""
                    name={name}
                    editor={ClassicEditor}
                    config={{
                      placeholder: "Start typing your blog post here...",
                      toolbar: [
                        "heading",
                        "|",
                        "bold",
                        "italic",
                        "link",
                        "bulletedList",
                        "numberedList",
                        "|",
                        "indent",
                        "outdent",
                        "|",
                        "codeBlock",
                        "blockQuote",
                        "insertTable",

                        "undo",
                        "redo",
                      ],
                    }}
                    onChange={handleEditorChange}
                  />
                ) : (
                  <div>Editor loading</div>
                )}
              </div>
            </Grid>

            <Grid item xs={12} sm={12}>
              <AnimateButton>
                <Button
                  disableElevation
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                  color="secondary"
                  endIcon={<SendIcon />}
                >
                  Create Post
                </Button>
              </AnimateButton>
            </Grid>
          </Grid>
        </form>
      </Card>
      <Snackbar
        open={openUpCreateAlert}
        sx={{ backgroundColor: "#2e7d32" }}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <Alert
          onClose={handleClose}
          sx={{ width: "100%", backgroundColor: "#2e7d32", color: "white" }}
        >
          Post Created Successfully!
        </Alert>
      </Snackbar>
    </>
  );
};

export default CreatePostForm;
