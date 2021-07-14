// const express = require('express')
// const router = express.Router()
const router = require('express').Router();
const apiRoutes = require('./api');
const homeRoutes = require('./homeroutes');

router.use('/', homeRoutes);
router.use('/api', apiRoutes);

// router.use('/', (req, res) => {
//     res.send("<h1>index route</h1>")
//   });
  

module.exports = router;