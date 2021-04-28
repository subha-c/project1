const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  userName: {
    type: String,
    required: true,
    index: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    index: true,
    unique: true,
  },
  password: {
    type: String,
    required: true
  },
  status: {
    type: String,
    default: "Active"
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

// export model user 
module.exports = mongoose.model("user", UserSchema);
