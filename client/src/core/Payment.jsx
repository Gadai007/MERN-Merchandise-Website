import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { isAuthenticated } from '../auth/helper'
import { createOrder, emptyCart, loadToCart } from './helper/coreapicalls'



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

   


    const showStripeButton = () => {
        return isAuthenticated() ? (
            <button className="btn btn-lg btn-success">Pay with stripe</button>
        ): (
            <Link to='/signin'>
                <button className="btn btn-lg btn-warning">SignIn</button>
            </Link>
        )
    }

    return (
        <div>
            <h1>Payment</h1>
            <h3>Total amount $ {getAmount()}</h3>
            {showStripeButton()}
        </div>
    )
}

export default Payment
