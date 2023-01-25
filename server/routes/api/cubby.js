const express = require('express')
const router = express.Router()
const createCubby = require('../../controllers/api/createCubbyController')
const getCubby = require('../../controllers/api/getCubbyController')

router.post('/createCubby', createCubby.createCubby)
router.get('/getCubbies', getCubby.getCubby)

module.exports = router
