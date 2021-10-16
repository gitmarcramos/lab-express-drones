// Iteration #1
const mongoose = require("mongoose");
const DroneModel = require("./../models/Drone.model");

const drones = [
  { name: "drone 1", propellers: 4, maxSpeed: 60, image: "https://images.unsplash.com/photo-1532989029401-439615f3d4b4?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzZ8fGRyb25lc3xlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60" },
  { name: "drone 2", propellers: 6, maxSpeed: 80, image: "https://images.unsplash.com/photo-1575560326142-fc881fc10ed5?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2049&q=80" },
  { name: "drone 3", propellers: 8, maxSpeed: 120, image: "https://images.unsplash.com/photo-1605575034353-070d67bd914b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1480&q=80" },
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




