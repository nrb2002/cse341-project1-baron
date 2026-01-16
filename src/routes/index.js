const router = require('express').Router();

router.get('/', (req,res) => {
    res.send('Welcome to Project 1!');
});

module.exports = router;