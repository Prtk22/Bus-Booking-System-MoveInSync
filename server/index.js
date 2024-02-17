const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
require("dotenv").config();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

const port = process.env.PORT || 5000;
const db = process.env.mongo_url || "mongodb://localhost/busbooking";

// mongoose.connect(url);
// const db = mongoose.connection;
// db.on("connected", () => {
//   console.log("Mongo Db Connection Successful");
// });
// db.on("error", () => {
//   console.log("Mongo Db Connection Failed");
// });

// connect to mongo
mongoose
  .connect(db)
  .then(() => console.log("Successfully connected to mongodb"))
  .catch((err) => console.log(err));


app.use("/api/users", require("./routes/usersRoutes"));
app.use("/api/buses", require("./routes/busesRoutes"));
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/bookings", require("./routes/bookingsRoutes"));
app.use("/api/cities", require("./routes/citiesRoutes"));

// listen to port
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
