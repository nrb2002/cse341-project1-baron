const express = require("express");
const router = express.Router();

const { getContactById, getAllContacts } = require("../controllers/contactsController");

//Build each contact route
router.get("/", getAllContacts);
router.get("/:id", getContactById);


module.exports = router;
