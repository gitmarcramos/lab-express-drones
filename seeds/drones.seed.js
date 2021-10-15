// Iteration #1
const mongoose = require("mongoose");
const DroneModel = require("./../models/Drone.model");

const drones = [
  { name: "drone 1", propellers: 4, maxSpeed: 60 },
  { name: "drone 2", propellers: 6, maxSpeed: 80 },
  { name: "drone 3", propellers: 8, maxSpeed: 120 },
];

const MONGO_URI =
  process.env.MONGODB_URI || "mongodb://localhost/lab-express-drones";


  async function feedDB(){
    try{
      const seededDrones = await DroneModel.create(drones);
      console.log(`DB feeded with ${seededDrones.length} drones`)
    } catch (e) {
      console.error(e, "DB not fed")
    }
  }

  async function deleteDB(){
    try{
      await DroneModel.deleteMany();
    } catch(e){
      console.error(e, "DB not deleted")
    }
  }

  async function connectToDB(){
   await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    })

    console.log("DB connected");
    await deleteDB();
    await feedDB();
    mongoose.disconnect(()=>{
      console.log('db disconnected');
    });

  }
  connectToDB();




