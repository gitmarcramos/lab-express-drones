const express = require("express");
const router = express.Router();

// require the Drone model here
const DroneModel = require("./../models/Drone.model");

router.get("/drones", async (req, res, next) => {
  const dronesList = await DroneModel.find();

  console.log(dronesList);

  res.render("drones/list.hbs", {
    dronesList,
  });
});


// send the form page
router.get("/drones/create", (req, res, next) => {
  res.render("drones/create-form.hbs")
});


// handle the POST for creating drones
router.post("/drones/create", async (req, res, next) => {
  const newDrone = {...req.body};
  try{
    await DroneModel.create(newDrone);
  } catch(err){
    console.log(err, "New drone not added");
  }
  res.redirect("/drones");
});

router.get("/drones/:id/edit", (req, res, next) => {
  // Iteration #4: Update the drone
  // ... your code here
});

router.post("/drones/:id/edit", (req, res, next) => {
  // Iteration #4: Update the drone
  // ... your code here
});

router.post("/drones/:id/delete", (req, res, next) => {
  // Iteration #5: Delete the drone
  // ... your code here
});

module.exports = router;
