const express = require('express')
const router = express.Router();
const data = {}

data.employee = require('../../data/employee.json')

router.route('/')
    .get((req, res) => {
        res.json(data.employee)
    })

    module.exports = router