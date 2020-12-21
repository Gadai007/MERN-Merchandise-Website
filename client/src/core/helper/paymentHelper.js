import { response } from "express"
import { token } from "morgan"

export const getMeToken = (userId, token) => {
    return fetch(`/api/payment/gettoken/${userId}`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    })
        .then(response => {
            return response.json()
        })
        .catch(err => console.log(err))
}

export const processPayment = (userId, token, paymentInfo) => {
    return fetch(`/api/payment/braintree/${userId}`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(paymentInfo)
    })
        .then(response => {
            return response.json()
        })
        .catch(err => console.log(err))
}