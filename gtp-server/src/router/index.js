const router = require('express').Router();
const taskRoute = require('./task.route')
const userRoute = require('./user.route')

router.use('/task', taskRoute)

router.use('/user', userRoute)

module.exports = router