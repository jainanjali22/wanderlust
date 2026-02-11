const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// 👇 yeh line IMPORTANT hai
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({
  email: {
    type: String,
    required: true
  }
});

// 👇 yeh line ERROR FIX karegi
userSchema.plugin(passportLocalMongoose.default || passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);
