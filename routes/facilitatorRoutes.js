const express = require('express')
const router = express.Router()

//get facilitator details
router.get('/getdetails', () =>{ })

//view courses
router.get("/courses", getCourse);


module.exports = router; 