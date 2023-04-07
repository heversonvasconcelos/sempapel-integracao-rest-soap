const express = require('express');
const router = express.Router();

router.get('/', function (req, res, next) {
    res.status(200).send({
        title: "Projeto ExpressJS que fornece uma API REST para consumir webservice SOAP",
        version: "1.0.0"
    });
});

module.exports = router;