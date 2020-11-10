const express = require('express');
const bodyParser = require('body-parser');
const { graphqlHTTP } = require('express-graphql');
const mongoose = require('mongoose');
const isAuth = require('./middleware/is-auth');
const cors = require('cors');

const graphQLSchema = require('./graphql/schema/index');
const graphQLResolvers = require('./graphql/resolvers/index');

const app = express();

app.use(isAuth);

app.use(cors());

app.use(bodyParser.json());

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