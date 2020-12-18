import React from 'react'
import { Link } from 'react-router-dom'
import Image from './Image'

const Card = (props) => {

    const { addToCart = true, removeFromCart = false } = props

    const showAddToCart = (addToCart) => {
        return (
            addToCart && (
                <Link className='nav-link btn-success' to='/signup'>
                    Add to cart
                </Link>
            )
        )
    }

    const showRemoveFromCart = (removeFromCart) => {
        return (
            removeFromCart && (
                <Link className='nav-link btn-danger' to='/signup'>
                    Remove from cart
                </Link>
            )
        )
    }

    return (
        <div className="card" >
            <Image id={props.product._id}/>
            <div className="card-body">
                <h3 className="card-title color">Name: {props.product.name}</h3>
                <h5 className="card-text color">Description: {props.product.description}</h5>
                <h6 className="card-text color">Price: {props.product.price}</h6>
                {showAddToCart(addToCart)}
                {showRemoveFromCart(removeFromCart)}
            </div>
        </div>
    )
}

export default Card
