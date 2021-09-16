const mongoose = require("mongoose");

// create a template of how the records should look like
const postSchema = mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  imagePath: { type: String, required: true },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

// export the model so that you can use it outside the scope of the file
// 'Post' stands for name of model
// postSchema stands for how the model looks like
module.exports = mongoose.model("Post", postSchema);
