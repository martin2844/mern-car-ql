const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const makeSchema = new Schema({
    name: String,
    country: String,
    foundedDate: Number,
});

module.exports = mongoose.model("Make", makeSchema);

