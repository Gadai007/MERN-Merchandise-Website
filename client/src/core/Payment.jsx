import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { isAuthenticated } from '../auth/helper'
import { createOrder, emptyCart, loadToCart } from './helper/coreapicalls'
import StripeCheckout from 'react-stripe-checkout'
import { result } from 'lodash'



const Payment = ({ products, setReload = f => f, reload = undefined }) => {

    const [data, setData] = useState({
        loading: false,
        success: false,
        address: '',
        error: '',
        
    })

    const userId = isAuthenticated() && isAuthenticated().user.id
    const tokenId = isAuthenticated() && isAuthenticated().token


    const getAmount = () => {
        let amount = 0
        products.map(product => {
            amount += product.price
        })
        return amount
    }

   const makePayment = (token) => {
       const body = {
           token,
           products
       }

       const headers = {
           'Content-Type': 'application/json'
       }

       return fetch('/api/payment', {
           method: 'POST',
           headers,
           body: JSON.stringify(body)
       })
       .then(response => {
           emptyCart(() => {
               response.json().then(res => {
                   console.log(products)
                   const order = {
                       products: products,
                       transaction_id: res.balance_transaction,
                       amount: res.amount
                   }
                   createOrder(userId, tokenId, order)
               })
        })
        setReload(!reload)
       })
       .catch(err => console.log(err))
   }


    const showStripeButton = () => {
        return isAuthenticated() ? (
            <StripeCheckout
                stripeKey='pk_test_51I2B3NGeKgANNoouexWJ6Bwm6IZ6zUjzopMq4DNqgY103hMWZ4qh8FXdOtKumYRRCYtTSSqxXaU5ndADAyUHsibg00FEtNIr43'
                token={makePayment}
                amount={getAmount() * 100}
                name='Buy your merch'
                shippingAddress
                billingAddress>
                <button className="btn btn-lg btn-success">Pay with stripe</button>
            </StripeCheckout>
        ): (
            <Link to='/signin'>
                <button className="btn btn-lg btn-warning">SignIn</button>
            </Link>
        )
    }

    return (
        <div>
            <h1>Payment</h1>
            <h3>Total amount you have to pay Rs. {getAmount()}</h3>
            {showStripeButton()}
        </div>
    )
}

export default Payment
