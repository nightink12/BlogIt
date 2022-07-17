const mongoose = require("mongoose");
//const { v4: uuid } = require("uuid"); //For generating ID's

const postSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    body: { type: String, required: true },
    author_name: {
      type: String,
      required: true,
    },
    author_email: {
      type: String,
      required: true,
    },
    author_avatar: {
      type: String,
      required: true,
    },

    likes: { type: Number, default: 0 },

    coverimg: {
      type: String,
    },

    likedby: { type: [String] },

    coverimg: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
