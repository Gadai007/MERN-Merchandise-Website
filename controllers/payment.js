const stripe = require('stripe')('SECRET')
const { v1: uuid } = require('uuid')


const makePayment = (req, res) => {
    const { products, token } = req.body

    let amount = 0
    products.map(product => {
        amount += products.price
    })

    const idempotencyKey = uuid()

    return stripe.customers.create({
        email: token.email,
        source: token.id
    }).then(customer => {
        stripe.charges.create({
            amount: amount,
            currency: 'usd',
            customer: customer.id,
            receipt_email: token.email,
            shipping: {
                name: token.card.name
            }
        }, { idempotencyKey })
            .then(result => {
                res.status(200).json(result)
            })
            .catch(err => console.log(err))
    })
}

module.exports = {
    makePayment
}