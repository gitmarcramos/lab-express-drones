const express = require("express");
const router = express.Router();

// require the Drone model here
const DroneModel = require("./../models/Drone.model");

router.get("/drones", async (req, res, next) => {
  const dronesList = await DroneModel.find();

  res.render("drones/list.hbs", {
    dronesList,
  });
});

// send the form page
router.get("/drones/create", (req, res, next) => {
  res.render("drones/create-form.hbs");
});

// handle the POST for creating drones
router.post("/drones/create", async (req, res, next) => {
  const newDrone = { ...req.body };
  try {
    await DroneModel.create(newDrone);
  } catch (err) {
    console.log(err, "New drone not added");
  }
  res.redirect("/drones");
});

router.get("/drones/:id", async (req, res, next) => {
  let foundDrone;
  try {
    console.log(req.params.id);
    foundDrone = await DroneModel.findById(req.params.id);
  } catch (err) {
    console.log(err, "Drone not found");
  }
  res.render("drones/details.hbs", {
    foundDrone,
  });
});

router.get("/drones/edit/:id", async (req, res, next) => {
  let foundDrone
  try {
    foundDrone = await DroneModel.findById(req.params.id);
  } catch (err) {
    console.log(err, "Drone not found");
  }

  res.render("drones/update-form.hbs", {
    foundDrone,
  });
});

router.post("/drones/:id/edit", (req, res, next) => {
  // Iteration #4: Update the drone
  // ... your code here
});

router.get("/drones/delete/:id", async (req, res, next) => {
  console.log(req.params.id);
  try {
    await DroneModel.findByIdAndRemove(req.params.id);
    console.log(`drone ${req.params.id} deleted`);
  } catch (err) {
    console.log(err, "Drone NOT deleted");
  }
  res.redirect("/drones");
});

module.exports = router;
