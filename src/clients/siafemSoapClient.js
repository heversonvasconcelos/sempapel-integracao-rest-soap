const soapClient = require('./soapClient');
const { IntegracaoSiafemException } = require('../domain/siafem');

const wsdlUrl = 'https://siafemhom.intra.fazenda.sp.gov.br/siafisico/RecebeMSG.asmx?WSDL';
const soapOperation = 'Mensagem';

exports.enviarSiafdocAoSiafem = async (request) => {

    try {
        let clientPromise = await soapClient.clientPromise(wsdlUrl);
        let result = await soapClient.invokeOperation(clientPromise, soapOperation, request);
        return result;
    } catch (error) {
        throw new IntegracaoSiafemException('não foi possível se comunicar com o SIAFEM.');
    }

}