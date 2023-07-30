const mongoose = require("mongoose");

const infoSchema = mongoose.Schema(
  {
    user: String,
    age: Number,
    city: String,
    contact: Number,
  },
  { versionKey: false }
);

const InfoModel = mongoose.model("info", infoSchema);
module.exports = InfoModel;
