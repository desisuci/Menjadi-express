//panggil library express
var express = require('express');
//panggil library router
var router = express.Router();
//panggil model
const Models = require('../models/index')

/*GET users listing. */
// http://localhost:3000/todo/
router.get('/', function (req, res, next) {
    res.send('Hello Todo!');
});

//create
router.post('/create', async (req, res) => {
    //Do something here
    console.log(req.body)
    try {
        const todo = await Models.todos.create(req.body)
        const response = {
            statusCode: 200,
            error: '',
            message: 'Create Todo',
            content: todo,
            contentB: req.body
        }
        res.json(response);
    } catch (err) {
        const response = {
            statusCode: 404,
            error: err.name
        }
        res.status(404).json(response);
    }
});

module.exports = router;