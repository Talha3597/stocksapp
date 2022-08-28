const express = require('express')
const router = express.Router();
const{searchData}=require('../controller/data.controller')
router.route('/search').get(searchData)
const{addAlert,alerts,deleteAlert}=require('../controller/alert.controller')
router.route('/addAlert').post(addAlert)
router.route('/alerts').get(alerts)
router.route('/deleteAlert').delete(deleteAlert)

module.exports= router