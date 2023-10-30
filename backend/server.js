import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import colors from "colors";
import path from "path";

import messageRoutes from "./routes/messageRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import agentRoutes from "./routes/agentRoutes.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";

dotenv.config();

connectDB();

const app = express(); // main thing

app.use(express.json()); // to accept json data

// app.get("/", (req, res) => {
//       res.send("APIs is running..");
//     });
  
  //   app.get("/api/messages",(req,res)=> {
  //     console.log("recive");
  //  res.json(messages);
  //   })


app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);
app.use("/api/agent", agentRoutes);


// // --------------------------deployment------------------------------

const __dirname1 = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname1, "/frntend/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname1, "frntend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running..");
  });
}

// // --------------------------deployment------------------------------


// Error Handling middlewares
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000 ;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}..`.yellow
      .bold
  )
);
