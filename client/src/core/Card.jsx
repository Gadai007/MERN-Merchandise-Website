import React, {useState, useEffect} from 'react'
import { Redirect} from 'react-router-dom'
import { addItemToCart, removeItemFromCart } from './helper/coreapicalls'
import Image from './Image'

const Card = (props) => {
    const { addToCart = true, removeFromCart = false, product, setReload = f => f, reload = undefined } = props

    const [redirect, setRedirect] = useState(false)
    const [count, setCount] = useState(product.count)

    const itemToCart = () => {
        addItemToCart(product, () => setRedirect(true))
    }

    const getRedirect = (redirect) => {
        if(redirect){
          return  <Redirect to='/cart'/>
        }
    }

    const showAddToCart = (addToCart) => {
        return (
            addToCart && (
                <button className='nav-link btn-success' onClick={itemToCart}>
                    Add to cart
                </button>
            )
        )
    }

    const showRemoveFromCart = (removeFromCart) => {
        return (
            removeFromCart && (
                <button className='nav-link btn-danger'
                onClick={() => { removeItemFromCart(product._id)
                                 setReload(!reload)}}>
                    Remove from cart
                </button>
            )
        )
    }

    return (
        <div className="card" >
            <Image id={product._id}/>
            <div className="card-body">
                {getRedirect(redirect)}
                <h3 className="card-title color">Name: {product.name}</h3>
                <h5 className="card-text color">Description: {product.description}</h5>
                <h6 className="card-text color">Price: {product.price}</h6>
                {showAddToCart(addToCart)}
                {showRemoveFromCart(removeFromCart)}
            </div>
        </div>
    )
}

export default Card
