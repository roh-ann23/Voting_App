import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import userRoutes from './features/routes/userRoutes.js';
import candidateRoutes from './features/routes/candidateRoutes.js'

import db from './config/db.js'

// swagger
import swaggerDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

// swagger configure

const options = {
    definition: {
      openapi: "3.1.0",
      info: {
        title: "Voting Application",
        description: "Node and ExpressJs Project as Voting Application",
      },
      servers: [
        {
          url: "http//:localhost:4000",
        },
      ],
    },
    apis: ["./features/routes/*.js"],
  };
  const specs = swaggerDoc(options);
  
const app = express();

// env file
dotenv.config();
// bodyParser.urlencoded({ extended: true });
app.use(bodyParser.json());

// port environment
const PORT = process.env.PORT || 4000
const mode = process.env.MODE;

// jwt authorization

// routes 
app.use("/user",userRoutes)
app.use("/candidate",candidateRoutes)

// home route .. swagger route
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
  
// initial route
app.get("/",function (req, res) {
    res.send("Hello Welcome to our Voting Application");
  });

app.listen(4000,()=>{
    console.log(`Server is listening on ${mode} mode to ${PORT} port number`);
});
  