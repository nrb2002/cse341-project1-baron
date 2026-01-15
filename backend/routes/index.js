const express = require("express");
const router = express.Router();

router.get('/', (req,res) => {
    res.send('Welcome to Project 1! This is the home route.');
});

module.exports = router;