import React, { useEffect, useState } from 'react'
import Base from '../core/Base'
import { isAuthenticated } from '../auth/helper/index'
import { userProducts } from './helper/userapicalls'



const UserDashBoard = () => {

    const [products, setProducts] = useState([])


    const { token, user: { id, name, email } } = isAuthenticated()

    const preLoad = (id, token) => {
        userProducts(id, token).then(response => {
            response.map(res => {
                return setProducts(prevProduct => {
                    return [...prevProduct, res]
                })
            })
        }).catch(err => console.log(err))
    }

    useEffect(() => {
        preLoad(id, token)
    },[id])

    const userLeftSide = () => {
        return (
            <div className="card admin">
                <div className="card-body">
                    <h3 className="card-title color">User Information</h3>
                    <h5 className="card-text color">Name: {name}</h5>
                    <h5 className="card-text color">Email: {email}</h5>
                </div>
            </div>
        )
    }

    const userRightSide = () => {
        return products.length === 0 ? (
            <h3>No products available Buy Now</h3>
        ) : (
                products.map(product => {
                    return (
                        <div className="card mb-4" key={product._id} >
                            <div className="card-body">
                                <h3 className="card-title color">Name: {product.products[0].name}</h3>
                                <h6 className="card-text color">Price: {product.products[0].price}</h6>
                                <h6 className="card-text color">Status: {product.status}</h6>
                            </div>
                        </div>
                    )
                })
            )
    }

    return (
        <Base title='UserDashBoard' description='UserDashBoard page'>
            <div className="row">
                <div className="col-3">{userLeftSide()}</div>
                <div className="col-9">{userRightSide()}</div>
            </div>
        </Base>
    )
}

export default UserDashBoard
