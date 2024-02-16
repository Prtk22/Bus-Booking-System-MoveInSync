const mongoose = require("mongoose");
const url = process.env.mongo_url;
console.log("url is", url);
mongoose.connect(url);

const db = mongoose.connection;

db.on("connected", () => {
  console.log("Mongo Db Connection Successful");
});

db.on("error", () => {
  console.log("Mongo Db Connection Failed");
});
