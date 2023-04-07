const soap = require('strong-soap').soap;

export const clientPromise = (wsdlUrl) => (
    new Promise((resolve, reject) => (
        soap.createClient(wsdlUrl, {}, (err, client) =>
            err ? reject(err) : resolve(client))
    ))
);

export const invokeOperation = ({ client, operation, request }) => (
    new Promise((resolve, reject) => client[operation](request, (err, result) => (
        err ? reject(err) : resolve(result))
    ))
);
