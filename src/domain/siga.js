const validator = require('../utils/validator');

export function validaCodigoUnico(codigoUnico) {
    if (validator.isEmpty(codigoUnico)) {
        throw new CodigoUnicoSigaException('cógido único inválido.');
    }
}

export class SigaException extends Error {
    constructor(message) {
        super(`Erro na comunicação com o SIGA: ${message}`);
    }
}

export class CodigoUnicoSigaException extends Error {
    constructor(message) {
        super(`Erro no Código Único do SIGA: ${message}`);
    }
}


