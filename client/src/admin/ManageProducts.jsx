import React, { useState, useEffect } from 'react'
import Base from '../core/Base'
import { isAuthenticated } from '../auth/helper/index'
import { getAllProducts, deleteProduct } from './helper/adminapicall'
import { Link } from 'react-router-dom'


const ManageProducts = () => {

    const [products, setProducts] = useState([])

    const { user, token } = isAuthenticated()

    const preLoad = () => {
        getAllProducts().then(response => {
            if (response.error) {
                console.log(response.err)
            } else {
                setProducts(response)
            }
        })
    }

    useEffect(() => {
        preLoad()
    }, [])

    const deleteProductHandler = (productId) => {
        deleteProduct(productId, user.id, token).then(response => {
            if (response.error) {
                console.log(response.error)
            } else {
                preLoad()
            }
        })
    }

    return (
        <Base title='Manage Products' description='Manage your products here'>
            <h2 className="mb-4">All products:</h2>
            <div className="row products">
                <div className="col-12">
                    <h2 className="text-center text-white my-3">{products.length ? `Total ${products.length} products` : 'No Product present'}</h2>

                    {products.map((product, index) => {
                        return (
                            <div key={index} className="row text-center mb-2 ">
                                <div className="col-4">
                                    <h3 className="text-white text-left">{product.name}</h3>
                                </div>
                                <div className="col-4">
                                    <Link
                                        className="btn btn-success"
                                        to={`/admin/product/update/${product._id}`}
                                    >
                                        <span className="">Update</span>
                                    </Link>
                                </div>
                                <div className="col-4">
                                    <button
                                        onClick={() => {
                                            deleteProductHandler(product._id);
                                        }}
                                        className="btn btn-danger"
                                    >
                                        Delete
                                    </button>
                                </div>
                                <hr/>
                            </div>
                        );
                    })}
                </div>
            </div>
        </Base>
    )
}

export default ManageProducts
