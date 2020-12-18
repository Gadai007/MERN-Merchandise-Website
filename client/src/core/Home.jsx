import React, { useState, useEffect } from 'react'
import Base from './Base'
import Card from './Card'
import { getProducts } from './helper/coreapicalls'



function Home() {

    const [products, setProducts] = useState([])
    const [error, setError] = useState(false)

    const loadAllProduct = () => {
        getProducts().then(response => {
            if (response.error) {
                setError(true)
            } else {
                setProducts(response)
            }
        })
    }

    useEffect(() => {
        loadAllProduct()
    }, [])

    return (
        <Base
            title='Home Page'
            description='Welcome to the store'>
            <div className="row text-center">
                {products.map((product, index) => {
                    return (
                        <div className="col-4" key={index}>
                            <Card product={product}/>
                        </div>
                    )
                })}
            </div>
        </Base>
    )
}

export default Home
