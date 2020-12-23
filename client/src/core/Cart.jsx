import React, {useState, useEffect} from 'react'
import Base from './Base'
import Card from './Card'
import { loadToCart } from './helper/coreapicalls'
import Payment from './Payment'


const Cart = () => {

    const [products, setProducts] = useState([])
    const [reload, setReload] = useState(false)

    useEffect(() => {
        setProducts(loadToCart())
    }, [reload])

    const loadAllProducts = (products) => {
        return (
            <div>
                <h1>Your Products:</h1>
                {products ? products.map((product, index) => {
                    return(
                        <div key={index} className='cart'>
                            <Card 
                                product={product}
                                removeFromCart={true}
                                addToCart={false}
                                setReload={setReload}
                                reload={reload}/>
                        </div>
                    )
                }): (
                    <h1>No Products available</h1>
                )}
            </div>
        )
    }


    return (
        <Base
            title='Cart Page'
            description='Manage your products'>
            <div className="row">
                <div className="col-6">
                    {loadAllProducts(products)}
                </div>
                <div className="col-6">
                    <Payment products={products} setReload={setReload} reload={reload}/>
                </div>
            </div>
        </Base>
    )
}

export default Cart
