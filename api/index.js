import express from "express";
import authRoutes from "./routes/auth.js";
// import userRoutes from "./routes/users.js";
// import homeRoutes from "./routes/home.js"; 
// const cors = require('cors');


const app = express();

app.use(express.json());
app.use("/api/auth", authRoutes);
// app.use("/api/users", userRoutes);
// app.use("/api/home", homeRoutes);


app.listen(8080, () => {
    console.log("Connected to 8080!");
});