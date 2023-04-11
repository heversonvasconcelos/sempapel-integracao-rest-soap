/**
 * 
 * https://blog.tericcabrel.com/validate-request-parameter-nodejs-yup/
 */
const yup = require('yup');

const processoSiafemSchema = yup.object({
    Usuario: yup.string().required(),
    Senha: yup.string().required(),
    AnoBase: yup.string().required(),
    UnidadeGestora: yup.string().default(''),
    DocumentoXML: yup.object({
        Documento: yup.object({
            UG: yup.string().optional(),
            Gestao: yup.string().optional(),
            Processo: yup.string().optional(),
            Desdobramento: yup.string().optional(),
            CodUnico: yup.string().required(),
            CodSemPapel: yup.string().required(),
            Objeto: yup.string().optional(),
            TipoLicitacao: yup.string().optional(),
            ID: yup.string().optional(),
            DigitoID: yup.string().optional(),
            ATA: yup.string().optional(),
            Convenio: yup.string().optional(),
            FlagPresencial: yup.string().optional(),
            FlagEletronico: yup.string().optional(),
            ObjetoConvenio: yup.string().optional(),
            CNPJ: yup.string().optional(),
            CodMunicipio: yup.string().optional(),
            SignatarioCedente: yup.string().optional(),
            SignatarioConvenente: yup.string().optional(),
            NaturezaDespesa: yup.string().optional(),
            NaturezaDespesa2: yup.string().optional(),
            NaturezaDespesa3: yup.string().optional(),
            NaturezaDespesa4: yup.string().optional(),
            NaturezaDespesa5: yup.string().optional(),
            DataVigenciaInicial: yup.string().optional(),
            DataVigenciaFinal: yup.string().optional(),
            DataCelebracao: yup.string().optional(),
            DataPublicacao: yup.string().optional(),
            ValorContrapartida: yup.string().optional(),
            ValorTotal: yup.string().optional(),
            Situacao: yup.string().optional(),
            ObjetoResumido1: yup.string().optional(),
            ObjetoResumido2: yup.string().optional(),
            ObjetoResumido3: yup.string().optional(),
        }).required(),
        Finalidade: yup.string().optional(),
    }).required(),
}).required();

module.exports = { processoSiafemSchema };