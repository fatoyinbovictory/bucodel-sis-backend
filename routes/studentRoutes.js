const express = require('express')
const router = express.Router()
const {addCourse} = require('../controllers/studentController')

//get student details
router.get('/getdetails', () =>{ })

//register for course
router.post("/addCourse/", addCourse);


module.exports = router; 