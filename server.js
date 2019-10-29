const express = require('express')
const app = express()
const port = 3000

//memanggil library body parser
const bodyParser = require('body-parser');
//config body parser
app.use(bodyParser.urlencoded({ extended: true })); //menangkap type request dalam bentuk form urlencoded
app.use(bodyParser.json()); //menangkap url dalam bentuk json
//nanti commit -m "config body parser"

//memanggil MongoConfig.js
const Mongoose = require('./MongoModel/MongoConfig')
const PersonModel = Mongoose.model("person", {
    firstName: String,
    lastName: String
});

//membuat request post
// nama request firstName, lastName
app.post('/profile', async (req, res) => {
    const insert = {
        firstName: req.body.firstName,
        lastName: req.body.lastName
    }
    var person = new PersonModel(insert);
    var result = await person.save();
    const response = {
        statusCode: 200,
        error: '',
        message: 'create person',
        content: result
    }
    res.json(response);
})


//Run aplikasi
app.get('/', (req, res) => res.send('Hello World!'))

// membuat request post

app.post('/hello', function (req, res) {
    const respon = {
        statusCode: 200,
        error: '',
        message: 'Hello JSON',
        content: req.body
    }
    res.json(respon);
})

//commit lagi dengan nama "membuat request post" lalu push
app.listen(port, () => console.log(`Example app listening on port ${port}!`))


