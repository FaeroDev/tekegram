const router = require('express').Router();




router.get('/', async (req, res) => {
    try {
        console.log('hello')
    } catch (err) {
        res.status(500).json(err);
    }
})