const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
})

app.post('/', (req, res) => {
    console.log('receiving data ...');
    console.log('body is ', req.body);
    res.send('uploaded data');
})

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
})