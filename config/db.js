
import  mongoose  from "mongoose";
import dotenv from "dotenv";
dotenv.config();


// const mongoose = require('mongoose');

const db = mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("Connected to MongoDB");
}).catch((error) => {
  console.error("Error connecting to MongoDB:", error);
});



// const MONGODB_URI = `${process.env.MONGO_URI}`
// // Set Up mongoDB connection
// mongoose.connect(MONGODB_URI  , {
//     useNewUrlParser : true,
//     useUnifiedTopology:true
// });


// // Set up default connection
// //mongoose maintains default connection object representing mongoDB connection 
// const db = mongoose.connection;

// // Define event listener for databases 

// db.on('connected',()=>{
//     // console.log("Connected to Database");
// })

// db.on('error',(err)=>{
//     // console.log("Error on Database" + err);
// })

// db.on('disconnected',()=>{
//     // console.log("Disonnected to Database");
// })

export default db;