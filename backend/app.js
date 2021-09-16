const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const postsRouter = require("./routes/posts");
const usersRouter = require("./routes/users");

// create the express app
const app = express();

// connect to the database
mongoose
  .connect(
    "mongodb+srv://sasha:" +
      process.env.MONGO_ATLAS_PW +
      "@cluster0.db6sh.mongodb.net/MeanCourseDB?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log("connected successfully to the database");
  })
  .catch((err) => {
    console.log("Couldn't connect to the database!!!" + err);
  });

app.use(bodyParser.json()); // this tells the app that it should parse json usin the bodyParser
// you can also tell it to parse urlEncoded using bodyParser.urlEncoded({extended : false});
app.use("/images", express.static(path.join("backend/images")));

/*
  this middleware does the following:
  1) No matter which domain the app that sends the request runs on it should allow it
  2) Which headers can be sent
  3) Which methods can be sent

  ### NOTICE: without this configuration we would have a CORS error and the posts wouldn't be passed to
      the angular app
  ###
*/
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

app.use("/api/posts", postsRouter);
app.use("/api/users", usersRouter);

// this makes the app visible to the outside ( same as export in angular)
module.exports = app;

/*
    HERE WE HAVE COMMENTS REGARDING THE CONTENT
    *******************************************

   1) app.use is adding a middle step in the path of the request,
      what this means is when we reach an endpoint that gets here , for now that endpoint is the main page,
      when we reach it we will go over the use calls and perform them one by one.
   2) if we want to continue to the next use call we need to use next() in the current one.
   3) when we finished we will use the res.send() and will send the final data and that will also automatically call res.end()
*/
