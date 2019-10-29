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

//membuat request post --> Tanpa Validasi
// nama request firstName, lastName
// app.post('/profile', async (req, res) => {
//     const insert = {
//         firstName: req.body.firstName,
//         lastName: req.body.lastName
//     }
//     var person = new PersonModel(insert);
//     var result = await person.save();
//     const response = {
//         statusCode: 200,
//         error: '',
//         message: 'create person',
//         content: result
//     }
//     res.json(response);
// })

// // membuat request post
// app.post('/hello', function (req, res) {
//     const respon = {
//         statusCode: 200,
//         error: '',
//         message: 'Hello JSON',
//         content: req.body
//     }
//     res.json(respon);
// })

//menampilkan semua data
//url http://localhost:3000/profile/list
app.get('/profile/list', async (req, res) => {
    //Do something here 
    var person = await PersonModel.find().exec();
    const response = {
        statusCode: 200,
        error: '',
        message: 'List Person',
        content: person
    }
    res.json(response);
})

//detail profile data method get
//http://localhost:3000/profile/detail/idmongo
app.get('/profile/detail/(:id)', async (req, res) => {
    let statusCode = 200
    let message = 'Detail Person'
    let person = await PersonModel.findById(req.params.id).exec();
    const response = {
        statusCode: 200,
        error: '',
        message: message,
        content: person
    }
    res.status(statusCode).json(response);
})

//update data profile menggunakan method put
//url http://localhost:3000/profile/update/idmongo
app.put('/profile/update/(:id)', async (req, res) => {
    let statusCode = 200
    let message = 'Update Person'
    var person = await PersonModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    const response = {
        statusCode: statusCode,
        error: message,
        message: message,
        content: person
    }
    res.status(statusCode).json(response);
})

//Delete data method get --> Tanpa Validasi
//url : http://localhost:3000/profile/delete/id
// app.get('/profile/delete/(:id)', async (req, res) => {
//     let statusCode = 200
//     let message = "Delete Person"
//     let person = await PersonModel.findByIdAndDelete(req.params.id).exec();
//     const response = {
//         statusCode: statusCode,
//         error: message,
//         message: message,
//         content: person
//     }
//     res.status(statusCode).json(response);
// })

//Delete data method get --> menggunakan validasi
//url : http://localhost:3000/profile/delete/id
app.get('/profile/delete/(:id)', async (req, res) => {
    const checkId = Mongoose.Types.ObjectId.isValid(req.params.is)
    //check dataobject id valid jika valid lakukan eksekusi delete
    let statusCode = 200
    let message = "Delete Person"
    if (checkId) {
        var person = await PersonModel.findByIdAndDelete(req.params.id).exec();
    } else {
        statusCode = 404
        message = 'Object Id Invalid'
        var person = null
    }
    const response = {
        statusCode: statusCode,
        error: message,
        message: message,
        content: person
    }
    res.status(statusCode).json(response);
})

//url : http://localhost:3000/profile/create
app.post('/profile/create', async (req, res) => {
    //Do something here
    console.log(req.body)
    if (!req.body.firstName) {
        res.status(400).json({
            statusCode: 400,
            error: 'firstName parameter is required',
            message: 'firstName parameter is required'
        });
    }
    else if (!req.body.lastName) {
        res.status(400).json({
            statusCode: 400,
            error: 'firstName parameter is required',
            message: 'firstName parameter is required'
        });
    }
    else {
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
    }
});

//Run aplikasi
app.get('/', (req, res) => res.send('Hello World!'))

//commit lagi dengan nama "membuat request post" lalu push
app.listen(port, () => console.log(`Example app listening on port ${port}!`))


