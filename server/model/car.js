const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const carSchema = new Schema({
    model: String,
    type: String,
    manufactureDate: Number,
    makerId: String
});

module.exports = mongoose.model("Car", carSchema);

