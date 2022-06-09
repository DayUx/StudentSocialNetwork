const express = require('express');
const router = express.Router();
const asyncMiddleware = require("./functions").asyncMiddleware;

router.get('/', asyncMiddleware(async (req, res, next) => {
    console.log("sdsdshdjsdhsjhdjsjhdjshdhj")
    res.send("UHOOOOOOOOOOOOOOOOOOOOO")
}));

module.exports = router;