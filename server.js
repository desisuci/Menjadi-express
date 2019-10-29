const express = require('express')
const app = express()
const port = 3000

//memanggil library body parser
const bodyParser = require('body-parser');
//config body parser
app.use(bodyParser.urlencoded({ extended: true })); //menangkap type request dalam bentuk form urlencoded
app.use(bodyParser.json()); //menangkap url dalam bentuk json

//run aplikasi
//nanti commit -m "config body parser"

// membuat request post

app.post('/hello', function (req, res) {
    const respon = {
        statusCode: 200,
        error: '',
        message: 'Hello JSON',
    }
    res.json(respon);
})

//commit lagi dengan nama "membuat request post" lalu push
app.listen(port, () => console.log(`Example app listening on port ${port}!`))


