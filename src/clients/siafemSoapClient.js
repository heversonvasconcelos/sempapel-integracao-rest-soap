const soapClient = require('./soapClient');
const siafem = require('../domain/siafem');
const { IntegracaoSiafemException } = require('../domain/siafem');

const wsdlUrl = 'https://siafemhom.intra.fazenda.sp.gov.br/siafisico/RecebeMSG.asmx?WSDL';
const soapOperation = 'Mensagem';

exports.enviarSiafdocAoSiafem = async (request) => {

    try {
        let clientPromise = soapClient.clientPromise(wsdlUrl);
        return await soapClient.invokeOperation(await clientPromise, soapOperation, request);
    } catch (error) {
        throw new IntegracaoSiafemException(`não foi possível se comunicar com o SIAFEM. 
            SIAFDOC: ${request.DocumentoXML}`);
    }

}