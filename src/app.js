/** 
 * Ref.:
 * https://gist.github.com/Guatom/6d0ecbe1f7b28fe35ede06d3d1f4d4f4 
 * https://github.com/programadriano/node-express
 * */

const express = require('express');
const app = express();

//Route
const index = require('./routes/index');
const integracaoSiafemRoute = require('./routes/integracaoSiafemRoute');


app.use('/', index);

// create application/json parser
// https://expressjs.com/en/resources/middleware/body-parser.html#express-route-specific
var jsonParser = bodyParser.json()

app.use('/siafem', jsonParser, integracaoSiafemRoute);

module.exports = app;
