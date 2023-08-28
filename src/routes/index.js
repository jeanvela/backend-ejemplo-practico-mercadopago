const { Router } = require('express')
const paymentRoutes = require('./payment.routes.js')
const router = Router()

router.use('/api', paymentRoutes)

module.exports = router