const router = require("express").Router();
let User = require("../models/user");

// Get all users
router.get("/users", async (req, res) => {
  User.find()
    .then((users) => res.json(users)) //serialize to json and send as part of response
    .catch((err) => res.status(400).json("Error finding all users: " + err));
});

// Get a particular user
router.get("/users/:id", async (req, res) => {
  const { id } = req.params;
  User.findById(id) //this id is the "_id" key generated and maintained by MongoDB itself
    .then((user) => res.json(user))
    .catch((err) => res.status(400).json("Error finding user: " + err));
});

//Get user By EMAIL
router.get("/users/email/:useremail", async (req, res) => {
  const { useremail } = req.params;
  User.find({ email: useremail })
    .then((user) => res.json(user))
    .catch((err) => res.status(400).json("Error finding user: " + err));
});

//Create a new user
router.post("/users", async (req, res) => {
  //constructing details of new user
  const { name, email, picture } = req.body;

  console.log(req.body);

  const newUser = new User({
    name,
    email,
    picture,
  });

  // Save the new user
  newUser
    .save()
    .then(() => res.json("User Added!"))
    .catch((err) => res.status(400).json("Error Creating New User: " + err));
});

module.exports = router;
