

const fetch = require('node-fetch');

const sigaExApiBaseUrl = 'https://www.documentos.homologacao.spsempapel.sp.gov.br/sigaex/api/v1/';
const idTipoSequenciaSiga = 2;
const anoEmissao = new Date().getFullYear();
const zerarInicioAno = 1;

const codigoUnicoSigaAPIEndpointUrl = `${sigaExApiBaseUrl}numeracao-generica?tiposequencia=${idTipoSequenciaSiga}&anoemissao=${anoEmissao}&zerarinicioano=${zerarInicioAno}`;

exports.getCodigoUnico = async (token) => {
    try {
        const response = await fetch(codigoUnicoSigaAPIEndpointUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        const data = await response.json();
        const codigoUnico = `${data.sequenciagenerica}-${data.digitoverificador}`;

        return codigoUnico;

    } catch (error) {
        throw new SigaException(`não foi possível gerar o código único. Request: ${codigoUnicoSigaAPIEndpointUrl}`);
    }
}


