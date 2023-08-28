const { Router } = require('express')
const { createOrder, success, webHook, failure, pending } = require('../controller/paymentController.js')
const router = Router()

router.post('/create-order', createOrder)
router.get('/success', success)
router.get('/failure', failure)
router.get('/pending', pending)
router.post('/webhook', webHook)

module.exports = router