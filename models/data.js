const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const dataSchema = new Schema({
  author: ObjectId,
  title: { type: String, required: [true, "title is needed"] }, //sprawi ze title bedzie wymagany
  description: { type: String, required: [true, "content is needed"] },
  created: { type: Date, default: Date.now() },
});
module.exports = mongoose.model("Data", dataSchema);
