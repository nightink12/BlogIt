const router = require("express").Router();
const { MongoClient, ObjectId } = require("mongodb");
let Post = require("../models/post");
//const { v4: uuid } = require("uuid"); //For generating ID's

// Get all posts
router.get("/posts/all", async (req, res) => {
  Post.find()
    .then((posts) => res.json(posts)) //serialize to json and send as part of response
    .catch((err) => res.status(400).json("Error finding all posts: " + err));
});

// Get a particular post
router.get("/posts/:id", async (req, res) => {
  const { id } = req.params;

  Post.findById(id) //this id is the "_id" key generated and maintained by MongoDB itself
    .then((post) => res.json(post))
    .catch((err) => res.status(400).json("Error finding post: " + err));
});

//Get all blogs of a particular author, using email as id
router.get("/posts/author/:id", async (req, res) => {
  //console.log(req.params);
  const { id } = req.params;

  Post.find({ author_email: id })
    .then((post) => res.json(post))
    .catch((err) => res.status(400).json("Error finding posts: " + err));
});

//Get request that helps the frontend check if current user has liked current post or not
router.get("/posts/like/:id/:sessionEmail", async (req, res) => {
  //console.log(req.params);
  const { id } = req.params;
  const { sessionEmail } = req.params;

  Post.find(
    {
      $and: [
        { _id: id },

        {
          likedby: { $in: [sessionEmail] },
        },
      ],
    },
    { _id: 1 }
  )

    .then((post) => res.json(post))
    .catch((err) => res.status(400).json("Error finding likes: " + err));
});

//Get Likes Count of a particular post
router.get("/posts/likecount/:id", async (req, res) => {
  //console.log(req.params);

  const { id } = req.params;

  Post.find({ _id: id }, { likes: 1 })
    .then((post) => res.json(post))
    .catch((err) => res.status(400).json("Error finding likes: " + err));
});

//Create a new post
router.post("/posts", async (req, res) => {
  //console.log("Inside create new post req");
  //console.log(req.body);

  //constructing details of new post
  const {
    title,
    body,
    author_name,
    author_email,
    author_avatar,
    likes,
    coverimg,
  } = req.body;

  const date = Date.parse(req.body.date);
  const newObjectId = new ObjectId();
  const _id = newObjectId;

  //console.log(req.body);

  const newPost = new Post({
    _id,
    title,
    body,
    author_name,
    author_email,
    author_avatar,
    likes,
    coverimg,
  });

  // Save the new post
  newPost
    .save()
    .then(() => res.json(_id))
    .catch((err) => res.status(400).json("Error Creating New Post: " + err));
});

//Update an existing post [assuming likes remain unaltered]
router.post("/posts/:id/edit", async (req, res) => {
  const { id } = req.params; //extracting id from url

  Post.findByIdAndUpdate(
    { _id: id },
    {
      $set: {
        title: req.body.title,
        body: req.body.body,
        coverimg: req.body.coverimg,
      },
    }
  ).exec(function (err) {
    if (err) {
      res.status(400).json("Error Updating Post: " + err);
    } else {
      res.json("Post Updated!!");
    }
  });
});

//Like a particular blog post
router.post("/posts/like/:id", async (req, res) => {
  //console.log(req.body);

  const { id } = req.params;

  //console.log(req.params);
  Post.findByIdAndUpdate(
    { _id: id },
    {
      $inc: { likes: 1 },

      $push: {
        likedby: req.body.likedbyauth,
      },
    }
  ).exec(function (err) {
    if (err) {
      res.status(400).json("Error Updating Likes: " + err);
    } else {
      res.json("Liked Post!!");
    }
  });
});

//Unlike a blog post
router.post("/posts/unlike/:id", async (req, res) => {
  //console.log(req.body);

  const { id } = req.params;

  Post.findByIdAndUpdate(
    { _id: id },
    {
      $inc: { likes: -1 },
      $set: {},

      $pull: {
        likedby: req.body.likedbyauth,
      },
    }
  ).exec(function (err) {
    if (err) {
      res.status(400).json("Error Updating Likes: " + err);
    } else {
      res.json("Unliked Post!");
    }
  });
});

//Deleting a Post
router.delete("/posts/:id", async (req, res) => {
  const { id } = req.params;
  Post.findByIdAndDelete(id)
    .then(() => res.json("Post Deleted!"))
    .catch((err) => res.status(400).json("Error Finding post by id: " + err));
});

module.exports = router;
