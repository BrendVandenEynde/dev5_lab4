// require express
const express = require('express');
// require router
const router = express.Router();

router.get("/", (req, res)  => { 
    res.json({
        status: "succes",
        message: "Get Messages",
    })
});

router.post("/", (req, res)  => {
    let message = req.body.message;
    res.json({
        status: "succes",
        message: ` POST ${message}`,
    });
});

module.exports = router;