const express = require("express");
const router = express.Router();

const {
    getFirstContact,
    getContactById,
    getAllContacts
} = require("../controllers/contactsController");

//Build each contact route
router.get("/", getAllContacts);
router.get("/1", getFirstContact);
router.get("/:id", getContactById);


module.exports = router;
