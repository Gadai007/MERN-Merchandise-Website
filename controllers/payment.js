const braintree = require("braintree");

const gateway = new braintree.BraintreeGateway({
    environment: braintree.Environment.Sandbox,
    merchantId: "useYourMerchantId",
    publicKey: "useYourPublicKey",
    privateKey: "useYourPrivateKey"
});

const getToken = (req, res) => {
    gateway.clientToken.generate({}, (err, response) => {
        if (err) {
            return res.status(500).json({ error: 'payment token not generated', err })
        }
        res.status(200).json(response)
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
        if(err){
            return res.status(500).json({error: 'payment post request failed ', err})
        }
        res.status(200).json(result)
    });
}

module.exports = {
    getToken,
    processPayment
}