const yup = require('yup');
const { processoSiafemSchema } = require('../schemas/processoSiafemSchema');

const sigaRestClient = require('../clients/sigaRestClient');
const siafemSoapClient = require('../clients/siafemSoapClient');
const siga = require('../domain/siga');
const siafem = require('../domain/siafem');

exports.post = async (request, response) => {
    const { body } = request;

    try {
        const data = processoSiafemSchema.validateSync(body, { abortEarly: false, stripUnknown: false });

        let codigoUnico = body.DocumentoXML.Documento.CodUnico;
        if (!codigoUnico) {
            let sigaToken = body.sigaToken;
            codigoUnico = await sigaRestClient.getCodigoUnico(sigaToken);
        }
        siga.validaCodigoUnico(codigoUnico);

        body.DocumentoXML = siafem.getSiafDocFormatado(codigoUnico, body.DocumentoXML);
        let siafemSoapResult = await siafemSoapClient.enviarSiafdocAoSiafem(body);

        response.status(200).json({
            Resultado: siafem.validarRetornoMengemSiafem(siafemSoapResult),
            SIAFDOC: body.DocumentoXML
        });

    } catch (error) {
        if (error instanceof yup.ValidationError) {
            return response.status(422).json({ Erro: error.errors });
        }
        response.status(500).json({ Erro: error.message, SIAFDOC: body.DocumentoXML });
    }
}

/**
 * Exemplo de chamada 
 * {
    "request": {
        "sigaToken": ""
        "Usuario": "",
        "Senha": "",
        "AnoBase": "2023",
        "UnidadeGestora": "010001",
        "DocumentoXML": {
            "Documento": {
                "UG": "010001",
                "Gestao": "00001",
                "Processo": "",
                "Desdobramento": "",
                "CodUnico": "20230000072",
                "CodSemPapel": "ZZPRC202300093",
                "Objeto": "Compra de mobiliario",
                "TipoLicitacao": "0",
                "ID": "",
                "DigitoID": "",
                "ATA": "N",
                "Convenio": "N",
                "FlagPresencial": "",
                "FlagEletronico": "",
                "ObjetoConvenio": "",
                "CNPJ": "37492763000107"
            },
            "Finalidade": "Compra de mobiliario"
        }
    }
}
 */