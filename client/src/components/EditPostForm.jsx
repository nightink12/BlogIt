import { useState } from "react";

import { useSelector } from "react-redux";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { Route, Link, Routes, useParams, useNavigate } from "react-router-dom";
import SendIcon from "@mui/icons-material/Send";
import { styled } from "@mui/material/styles";

// material-ui
import { useTheme } from "@mui/material/styles";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
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
import CardMedia from "@mui/material/CardMedia";
import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";

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

import Button from "@mui/material/Button";

import e from "cors";
import React, { useEffect, useRef } from "react";
import { setDate } from "date-fns/esm";
import dotenv from "dotenv";

dotenv.config();
const baseURL = process.env.REACT_APP_BASEURL || "http://localhost:4000";

const EditPostForm = () => {
  const navigate = useNavigate();
  const params = useParams();
  //console.log(params.id);

  const [openUpEditAlert, setOpenUpEditAlert] = React.useState(false);
  const [oldCoverImg, setOldCoverImg] = useState("");
  const [singleBlog, getSingleBlog] = useState("");

  const handleClose = () => {
    setOpenUpEditAlert(false);
  };

  const [editorLoaded, setEditorLoaded] = useState(false);

  useEffect(() => {
    setEditorLoaded(true);
  }, []);

  React.useEffect(() => {
    getBlog();
  }, []);

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

  function handleSubmit(e) {
    e.preventDefault();

    // If the post body is too short, do not submit
    if (singleBlog.body.length < 75) {
      alert("Cannot submit such a short post!");
    } else {
      //post the edited blog post
      axios
        .post(`${baseURL}/posts/` + params.id + "/edit", singleBlog)
        .then((res) => {
          //console.log(res);

          setOpenUpEditAlert(true);
          setTimeout(() => {
            window.location = "/postdetails/" + params.id;
          }, 400);
        })

        .catch((err) => console.log(err));
    }
  }

  function handleEditorChange(e, editor) {
    const data = editor.getData();
    // console.log(data);
    getSingleBlog({ ...singleBlog, body: data });
  }

  function onDrop(pictureFiles, pictureDataURLs) {
    const coverImage = pictureDataURLs[0];
    //console.log(pictureDataURLs[0]);
    getSingleBlog({ ...singleBlog, coverimg: coverImage });
  }

  function handleTitleChange(e) {
    getSingleBlog({ ...singleBlog, title: e.target.value });
  }

  //fetch a particular post from backend
  const getBlog = () => {
    //console.log("Get Function Called");
    axios
      .get(`${baseURL}/posts/` + params.id)
      .then((response) => {
        const singleBlogResp = response.data;
        //console.log(response.data);

        //setPost(response.data)
        getSingleBlog(singleBlogResp);

        setOldCoverImg(singleBlogResp.coverimg);

        if (singleBlogResp.author_email != getUserSession().email) {
          navigate("/");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Card>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={matchDownSM ? 0 : 2}>
            <Grid item xs={12} sm={12}>
              <TextField
                inputProps={{ style: { fontSize: 25 } }}
                InputLabelProps={{
                  shrink: true,
                  style: { fontSize: 25, paddingBottom: "40px" },
                }}
                id="standard-basic1"
                label="Post Title"
                variant="standard"
                fullWidth
                value={singleBlog.title}
                onChange={handleTitleChange}
              />
            </Grid>

            <Grid item xs={12} sm={12}>
              <ImageUploader
                withIcon={false}
                withPreview={true}
                buttonText="Choose Blog Cover Image"
                onChange={onDrop}
                imgExtension={[".jpg", ".gif", ".png", ".gif"]}
                maxFileSize={5242880}
                singleImage={true}
              />
            </Grid>

            {singleBlog.coverimg != "" && (
              <Grid
                item
                xs={12}
                sm={12}
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justifyContent="center"
              >
                <CardMedia
                  component="img"
                  height="250"
                  width="600"
                  sx={{ width: "450px" }}
                  image={oldCoverImg}
                  alt="NO Cover Image"
                />
              </Grid>
            )}

            <Grid item xs={12} sm={12}>
              <div>
                {editorLoaded ? (
                  <CKEditor
                    type=""
                    name={name}
                    data={singleBlog.body}
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
                    onClick={handleEditorChange}
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
                  Update Post
                </Button>
              </AnimateButton>
            </Grid>
          </Grid>
        </form>
      </Card>

      <Snackbar
        open={openUpEditAlert}
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
};

export default EditPostForm;
