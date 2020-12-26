import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { isAuthenticated } from '../auth/helper'
import { createOrder, emptyCart, loadToCart } from './helper/coreapicalls'
import StripeCheckout from 'react-stripe-checkout'



const Payment = ({ products, setReload = f => f, reload = undefined }) => {

    const [data, setData] = useState({
        loading: false,
        success: false,
        address: '',
        error: '',
        
    })

    const userId = isAuthenticated() && isAuthenticated().user.id
    const token = isAuthenticated() && isAuthenticated().token


    const getAmount = () => {
        let amount = 0
        products.map(product => {
            amount += product.price
        })
        return amount
    }

   const makePayment = (token) => {
       
   }


    const showStripeButton = () => {
        return isAuthenticated() ? (
            <StripeCheckout
                stripeKey=''
                token={makePayment}
                amount={getAmount}
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
            <h3>Total amount you have to pay $ {getAmount()}</h3>
            {showStripeButton()}
        </div>
    )
}

export default Payment
