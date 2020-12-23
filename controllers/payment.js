const braintree = require('braintree');

const gateway = new braintree.BraintreeGateway({
    environment: braintree.Environment.Sandbox,
    merchantId:   'mcsf4rmnd9tb3jc7',
    publicKey:    'xwgps89s8c88q45c',
    privateKey:   '1fa2473d693905bb4f171a81a0da10fe'
  });

const getToken = (req, res) => {
    gateway.clientToken.generate({}, (err, response) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).send(response)
        }
    });
}

const processPayment = (req, res) => {

    let nonceFromTheClient = req.body.paymentMethodNonce
    let amountFromTheClient = req.body.amount

    gateway.transaction.sale({
        amount: amountFromTheClient,
        paymentMethodNonce: nonceFromTheClient,
        options: {
            submitForSettlement: true
        }
    }, (err, result) => {
        if (err) {
            return res.status(500).send(err)
        }
        res.status(200).send(result)
    });
}

module.exports = {
    getToken,
    processPayment
}