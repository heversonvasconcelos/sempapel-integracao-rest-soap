const validator = require('../utils/validator');

function validaCodigoUnico(codigoUnico) {
    if (validator.isEmpty(codigoUnico)) {
        throw new CodigoUnicoSigaException('cógido único inválido.');
    }
}

class SigaException extends Error {
    constructor(message) {
        super(`Erro na comunicação com o SIGA: ${message}`);
    }
}

class CodigoUnicoSigaException extends Error {
    constructor(message) {
        super(`Erro no Código Único do SIGA: ${message}`);
    }
}

module.exports = { validaCodigoUnico, SigaException, CodigoUnicoSigaException }
