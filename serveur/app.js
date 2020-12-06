const express = require('express');
const bodyParser = require('body-parser');
const { graphqlHTTP } = require('express-graphql');
const mongoose = require('mongoose');
const isAuth = require('./middleware/is-auth');
const cors = require('cors');
// const { createProxyMiddleware } = require('http-proxy-middleware');

const graphQLSchema = require('./graphql/schema/index');
const graphQLResolvers = require('./graphql/resolvers/index');

const app = express();

app.use(isAuth);

app.use(cors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    optionsSuccessStatus: 200 /* some legacy browsers (IE11, various SmartTVs) choke on 204 */,
  }))

// app.use(express.limit('4mb'));

// app.use(bodyParser.json({
//     limit: '1gb'
//   }));
  
//   app.use(bodyParser.urlencoded({
//     limit: '1gb',
//     parameterLimit: 100000,
//     extended: true 
//   }));

// Add this code for maximun 150mb 
// app.use(bodyParser.json({limit: '1Go'}));
// app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
//     extended: false 
// })); 

app.use(bodyParser.text({ type: 'text/html' }));
// app.use(bodyParser.urlencoded()); 
app.use(bodyParser.json({limit: '1gb'}));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With', 'Accept', 'Content-Type, Authorization');
    if(req.method === 'OPTIONS'){
        return res.status(200).json({});
    }
    next();
});

// app.use("/graphql", (req, res, next) => {
//     res.header('Access-Control-Allow-Credentials', true);
//     res.header('Access-Control-Allow-Headers', 'content-type, authorization, content-length, x-requested-with, accept, origin');
//     res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS')
//     res.header('Allow', 'POST, GET, OPTIONS')
//     res.header('Access-Control-Allow-Origin', '*');
//     if (req.method === 'OPTIONS') {
//         res.sendStatus(200);
//     } else {
//         next();
//     }
//   }, graphqlHTTP({
//     schema:graphQLSchema,
//     rootValue:graphQLResolvers,
//     graphiql:true
// }));

// app.use('/graphql', createProxyMiddleware({ 
//     target: 'http://localhost:3000/', //original url
//     changeOrigin: true, 
//     //secure: false,
//     onProxyRes: function (proxyRes, req, res) {
//        proxyRes.headers['Access-Control-Allow-Origin'] = '*';
//     }
// }));

app.use('/graphql', graphqlHTTP({
    schema:graphQLSchema,
    rootValue:graphQLResolvers,
    graphiql:true
}));

const url = 'mongodb://localhost:27017/fordisco_data';
mongoose.connect(url, {useNewUrlParser:true, useUnifiedTopology:true, useFindAndModify:false});
const db = mongoose.connection;
db.once('open', () => {
    console.log(`MongoDB connecte sur`, url);
})
db.on('error', err => {
    console.log(`Erreur de connexion`, err);
})

app.listen(8000, () => {
    console.log('Serveur demmare sur le port 8000');
})