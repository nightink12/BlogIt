import React from "react";
import { useState } from "react";
import ReactDOM from "react-dom";
import ImageUploader from "react-images-upload";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";

const UploadCoverImage = () => {
  const [pictures, setPictures] = useState([]);

  function onDrop(pictureFiles, pictureDataURLs) {
    setPictures(pictureDataURLs);
    console.log(pictureDataURLs);
  }

  return (
    <>
      <ImageUploader
        withIcon={true}
        withPreview={true}
        buttonText="Choose Blog Cover Image"
        onChange={onDrop}
        imgExtension={[".jpg", ".gif", ".png", ".gif"]}
        maxFileSize={5242880}
        singleImage="true"
      />
    </>
  );
};

export default UploadCoverImage;
