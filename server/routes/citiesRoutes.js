const express = require("express");
const router = express();

const { GetAllCities } = require("../controllers/citiesController");

router.get("/get-all-cities", GetAllCities);

module.exports = router;
