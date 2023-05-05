import express from "express";
import { routes } from './routes/route.js';
import cors from "cors";
import dotenv from 'dotenv';
import { connectDB } from "./db/connection.js";
dotenv.config({path:"./config.env"});

const app = express();
const port = process.env.PORT || 5000;

// Use middlewares 
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//mongodb connection
const con = connectDB();
con.then((db) => {
  if (!db) return process.exit(1);
  //listen only when valid connection
  app.listen(port, () => {
    console.log(`Server is running on port:http://localhost:${port}`);
  });
  app.on('error', err => console.log(`failed to connect with http server ${err}`));
  //error in mongodb connection
}).catch(error => {
  console.log(`connection failed ${error}`)
});

// Use routes
app.use(routes);
