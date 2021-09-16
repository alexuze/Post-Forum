const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

// create a template of how the records should look like
const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

userSchema.plugin(uniqueValidator);

// export the model so that you can use it outside the scope of the file
// 'Post' stands for name of model
// postSchema stands for how the model looks like
module.exports = mongoose.model("User", userSchema);
