const json2xml = require('json2xml');
var cheerio = require('cheerio');
const validator = require('../utils/validator');

function getSiafDocFormatado(codigoUnico, documentoXML) {

    let documento = documentoXML.Documento;
    documento.CodUnico = codigoUnico;
    var jsonOptions = { compact: true, ignoreComment: true, spaces: 0 };
    const documentoConvertido = json2xml(documento, jsonOptions);

    let finalidade = documentoXML.Finalidade;

    const siafDocXML = `<![CDATA[
                    <SIAFDOC>
                        <cdMsg>SIAFPROCESSO001</cdMsg>
                        <SiafemDocProcesso>
                            <documento>
                                ${documentoConvertido}
                            </documento>
                            <finalidade>
                                <Repeticao>
                                    <desc ID='1'>
                                        <Finalidade>${finalidade}</Finalidade>
                                    </desc>
                                </Repeticao>
                            </finalidade>
                        </SiafemDocProcesso>
                    </SIAFDOC>
                ]]>`;

    return siafDocXML.replace(/[\t\r\n]/gm, '').trim();

}

function validarRetornoMengemSiafem(result) {
    const mensagemResult = result.MensagemResult;
    if (validator.isEmpty(mensagemResult)) {
        throw new IntegracaoSiafemException('não retornou resposta');
    }

    const $ = cheerio.load(mensagemResult, { ignoreWhitespace: true, xmlMode: true });
    const statusOperacaoXml = $('StatusOperacao').text();
    const msgErroXml = $('MsgErro').text();
    const msgRetornoXml = $('MsgRetorno').text();
    const mensagemResultXml = $('MensagemResult').text();
    const msgRetornoSemPapelXml = $('MsgRetornoSemPapel').text();

    if (validator.isEmpty(statusOperacaoXml)) {
        if (validator.isEmpty(msgErroXml) &&
            validator.isEmpty(msgRetornoXml) &&
            validator.isEmpty(mensagemResultXml) &&
            validator.isEmpty(msgRetornoSemPapelXml)) {
            msgErroXml = result;
        }
        throw new IntegracaoSiafemException(`${msgErroXml} ${msgRetornoXml} ${mensagemResultXml} ${msgRetornoSemPapelXml}`);
    }
    else if (statusOperacaoXml === 'false') {
        throw new IntegracaoSiafemException(msgRetornoXml);
    }


    return result;

}

class IntegracaoSiafemException extends Error {
    constructor(message) {
        super('Erro na integração com SIAFEM: ' + message);
    }
}

module.exports = { getSiafDocFormatado, validarRetornoMengemSiafem, IntegracaoSiafemException }