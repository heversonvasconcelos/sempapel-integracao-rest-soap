const soapClient = require('./soapClient');
const siafem = require('../domain/siafem');

const wsdlUrl = 'https://siafemhom.intra.fazenda.sp.gov.br/siafisico/RecebeMSG.asmx?WSDL';
const soapOperation = 'Mensagem';

exports.enviarSiafdocAoSiafem = async (siafDoc) => {

    try {
        let clientPromise = soapClient.clientPromise(wsdlUrl);
        return await soapClient.invokeOperation(await clientPromise, soapOperation, siafDoc);
    } catch (error) {
        throw new SigaException(`não foi possível gerar o código único. Request: ${codigoUnicoSigaAPIEndpointUrl}`);
    }

}