const express = require("express");
const router = express.Router();

const {getProfessional} = require("../controllers/professionalController");

router.get("/professional", getProfessional);

module.exports = router;
