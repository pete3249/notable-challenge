const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

const { MongoClient } = require('mongodb');
const uri = "mongodb://localhost:27017/test";
const client = new MongoClient(uri);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//query parameters
app.get('/', async (req, res) => {
    await client.connect();
    let databasesList = await client.db().admin().listDatabases();
    console.log(databasesList)
    res.send('Hello World!' + req.query.name);
})

//path params
app.get('/:name', (req, res) => {
    res.send('Hello World! '+ req.params.name);
})

app.post('/', (req, res) => {
    console.log('receiving data ...');
    console.log('body is ', req.body);
    res.send('uploaded data');
})

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
})