const mercadopago = require('mercadopago')

const createOrder = async (req, res) => {
    try {
        mercadopago.configure({
            access_token: 'TEST-3859213217132690-082813-3f9424c2efa28db26249cf7a84f25470-1462554407'
        })

        const result = await mercadopago.preferences.create({
            items: [
                {
                    title: "Laptop Lenovo",
                    unit_price: 50000,
                    currency_id: "ARS",
                    quantity: 1
                }
            ],
            back_urls: {
                success: 'http://localhost:3001/api/success',
                failure: 'http://localhost:3001/api/failure',
                pending: 'http://localhost:3001/api/pending'
            },
            // cuando el pago este echo
            notification_url: 'http://localhost:3001/api/webhook' // url con https
        })
        console.log(result)
        res.status(200).send('creating order')
    } catch (error) {
        res.status(404).json({message: error.message})
    }
    // en el front hacemos la peticion guardamos la respuesta en una constante data
    // hacemos un return window.location.href = data.init_point
}

const success = async (req, res) => {
    try {
        res.status(200).send('success')
    } catch (error) {
        res.status(404).json({message: error.message})
    }
}

const failure = async (req, res) => {
    try {
        res.status(200).send('failure')
    } catch (error) {
        res.status(404).json({message: error.message})
    }
}

const pending = async (req, res) => {
    try {
        res.status(200).send('pending')
    } catch (error) {
        res.status(404).json({message: error.message})
    }
}

const webHook = async (req, res) => {
    const payment = req.query
    try {
        if (payment.type === 'payment') {
            const data = await mercadopago.payment.findById(payment['data.id'])
            console.log(data)
        }
        // res.status(200).send('webhook')
        res.sendStatus(204)
    } catch (error) {
        res.status(404).json({message: error.message})
    }
}

module.exports = {
    createOrder,
    success,
    webHook,
    failure,
    pending
}