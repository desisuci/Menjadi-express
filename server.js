const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => res.send('Hello World!'))

//run aplikasi

// membuat request post
// nama request firstname, lastname

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
