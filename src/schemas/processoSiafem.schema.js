// src/schemas/processoSiafem.schema.js
/**
 * 
 * https://dev.to/simonplend/learn-how-to-handle-validation-in-express-3blb
 * https://www.npmjs.com/package/express-json-validator-middleware
 */

const processoSiafemSchema = {
    type: 'object',
    required: ['Usuario', 'Senha', 'AnoBase', 'DocumentoXML'],
    properties: {
        Usuario: {
            type: 'string',
            minLength: 1,
        },
        Senha: {
            type: 'string',
            minLength: 1,
        },
        AnoBase: {
            type: 'string',
            minLength: 1,
        },
        UnidadeGestora: {
            type: 'string',
            minLength: 1,
        },
        DocumentoXML: {
            type: 'object',
            required: ['Documento', 'Finalidade'],
            properties: {
                Documento: {
                    type: 'object',
                    required: ['UG', 'Gestao'],
                    properties: {
                        UG: {
                            type: 'string',
                            minLength: 1,
                        },
                        Gestao: {
                            type: 'string',
                            minLength: 1,
                        },
                        Gestao: {
                            type: 'string',
                            minLength: 1,
                        },
                        Processo: {
                            type: 'string',
                            minLength: 1,
                        },
                        Desdobramento: {
                            type: 'string',
                            minLength: 1,
                        },
                        CodUnico: {
                            type: 'string',
                            minLength: 1,
                        },
                        CodSemPapel: {
                            type: 'string',
                            minLength: 1,
                        },
                        Objeto: {
                            type: 'string',
                            minLength: 1,
                        },
                        TipoLicitacao: {
                            type: 'string',
                            minLength: 1,
                        }
                    }
                },
                Finalidade: {
                    type: 'string',
                    minLength: 1,
                }
            }
        }
    },
};

export default processoSiafemSchema;