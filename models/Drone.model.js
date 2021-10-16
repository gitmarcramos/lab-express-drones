// Iteration #1
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const droneSchema = new Schema({
  name: String,
  propellers: Number,
  maxSpeed: Number,
  image: String
});

const DroneModel = mongoose.model("drone", droneSchema);

module.exports = DroneModel;
