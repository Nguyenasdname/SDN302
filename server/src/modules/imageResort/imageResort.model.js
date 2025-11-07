const mongoose = require("mongoose");

const imageResortSchema = mongoose.Schema({
  resortId: { type: mongoose.Schema.Types.ObjectId, ref: "Resort" },
  imageUrl: String,
});

module.exports = mongoose.model("ImageResort", imageResortSchema);
