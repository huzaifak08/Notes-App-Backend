const express = require('express');
const router = new express.Router();

router.get("/", (req, res) => {
    res.send('This is Home Page');
});

module.exports = router;