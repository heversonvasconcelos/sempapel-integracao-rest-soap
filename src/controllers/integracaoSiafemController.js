const sigaRestClient = require('../clients/sigaRestClient');
const siafemSoapClient = require('../clients/siafemSoapClient');
const siga = require('../domain/siga');
const siafem = require('../domain/siafem');
const validator = require('../utils/validator');

exports.post = async ({ body: { request } }, res) => {
    res.setHeader("Content-Type", "application/json");
    try {
        let codigoUnico = request.CodigoUnico;
        if (validator.isEmpty(codigoUnico)) {
            let sigaToken = request.sigaToken;
            codigoUnico = await sigaRestClient.getCodigoUnico(sigaToken);
        }
        siga.validaCodigoUnico(codigoUnico);

        request.DocumentoXML = siafem.getSiafDocFormatado(codigoUnico, request.DocumentoXML);
        let siafemSoapResult = await siafemSoapClient.enviarSiafdocAoSiafem(request);

        res.status(200).json({
            Resultado: siafem.validarRetornoMengemSiafem(siafemSoapResult),
            SIAFDOC: request.DocumentoXML
        });

    } catch (error) {
        res.status(500).json({ Erro: error.message,  SIAFDOC: request.DocumentoXML });
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