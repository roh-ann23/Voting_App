import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import userRoutes from './features/routes/userRoutes.js';
import candidateRoutes from './features/routes/candidateRoutes.js'

import db from './config/db.js'


const app = express();

// env file
dotenv.config();
// bodyParser.urlencoded({ extended: true });
app.use(bodyParser.json());

// port environment
const port = process.env.PORT || 4000
const mode = process.env.MODE;

// jwt authorization

// routes 
app.use("/user",userRoutes)
app.use("/candidate",candidateRoutes)

  
app.listen(4000,()=>{
    console.log(`Server is listening on ${mode} mode to ${port} port number`);
});
  