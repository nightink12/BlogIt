//---------------------CONTAINS ALL PACKAGES REQD BY APPN----------------------------------

const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const postsRouter = require("./routes/postRoutes");
const usersRouter = require("./routes/userRoutes");

const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");

//----------------------FOR EJS FILES------------------------------------------------------
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//----------------------FOR USING JSON AND FORM DATA ---------------------------------
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: "50mb" }));

app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(cors());
dotenv.config();

app.use(express.json());

app.use(methodOverride("_method"));

//----------------------FOR ROUTES---------------------------------------------------------
app.use("/", postsRouter);
app.use("/", usersRouter);

//--------------------SERVE STATIC ASSETS IF IN PRODUCTION---------------------------------

if (process.env.NODE_ENV === "production") {
  // set a static folder
  app.use(express.static("client/build"));

  // Provide a wildcard as a fallback for all routes
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

//---------------------SETTING UP CONNECTION-----------------------------------------------

//config PORT
const PORT = process.env.PORT || 4000;
//config MongoDB
//const MONGO_URI = process.env.MONGO_URI;
//const MONGO_DB_NAME = process.env.MONGO_DB_NAME;

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MONGO CONNECTION OPEN!!!");
  })
  .catch((err) => {
    console.log("OH NO MONGO CONNECTION ERROR!!!!");
    console.log(err);
  });

app.listen(PORT, () => {
  console.log(`APP IS LISTENING ON PORT ${PORT}`);
});
