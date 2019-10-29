const express = require('express')
const app = express()
const port = 3000

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => res.send('Hello World!'))

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/belajarmongo');

const PersonModel = mongoose.model("person", {
    firstname: String,
    lastname: String
});

app.get('/hello', function (req, res) {
    const respon = {
        statusCode: 200,
        error: '',
        message: 'Hello JSON'
    }
    res.json(respon);
})

app.post('/create', async (req, res) => {
    console.log(req.body);
    var person = new PersonModel(req.body);
    var result = await person.save();
    const response = {
        statusCode: 200,
        error: '',
        message: 'Create Person',
        content: result
    }
    res.json(response);
})


app.listen(port, () => console.log(`Example app listening on port ${port}!`))
