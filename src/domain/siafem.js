const json2xml = require('json2xml');

export function getSiafDocFormatado(codigoUnico, documentoXML) {

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

function getTagValueFromXmlDoc(doc, tagName) {
    return doc.getElementsByTagName(tagName)[0].childNodes[0].nodeValue;
}

function validarRetornoMengemSiafem(result) {
    const mensagemResult = result.MensagemResult;
    if (isEmpty(mensagemResult)) {
        throw new IntegracaoSiafemException('não retornou resposta');
    }

    try {
        const statusOperacaoXml = getTagValueFromXmlDoc(xmlDocDom, 'StatusOperacao');
        const msgErroXml = getTagValueFromXmlDoc(xmlDocDom, 'MsgErro');
        const msgRetornoXml = getTagValueFromXmlDoc(xmlDocDom, 'MsgRetorno');
        const mensagemResultXml = getTagValueFromXmlDoc(xmlDocDom, 'MensagemResult');
        const msgRetornoSemPapelXml = getTagValueFromXmlDoc(xmlDocDom, 'msgRetornoSemPapel');

        return result;
    } catch (error) {
        throw new IntegracaoSiafemException('formato da resposta do SIAFEM inválido ' + error);
    }

}

class IntegracaoSiafemException extends Error {
    constructor(message) {
        super('Erro na integração com SIAFEM: ' + message);
    }
}
