const express = require("express");

const db = require("../data/helpers/actionModel");

const router = express.Router();

router.use(express.json());

//ENDPOINTS

module.exports = router;
