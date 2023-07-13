const mongoose = require("mongoose");

const adminSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  setAccess: {
    type: Boolean,
    required: false,
    default: true,
  },
},{
  tymestamps: true,
  versionKey: false
});

module.exports = mongoose.model("Admin", adminSchema);
