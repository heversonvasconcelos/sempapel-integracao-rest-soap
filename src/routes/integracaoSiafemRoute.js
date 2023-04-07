const express = require('express');
const router = express.Router();

const integracaoSiafemController = require('../controllers/integracaoSiafemController')

router.post('/enviar-processo', integracaoSiafemController.post);

module.exports = router;