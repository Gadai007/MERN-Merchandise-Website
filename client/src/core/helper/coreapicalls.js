
export const getProducts = () => {
    return fetch('/api/products', { method: 'GET' })
        .then(response => {
            return response.json()
        }).catch(err => console.log(err))
}

export const addItemToCart = (item, next) => {
    let cart = []
    if (typeof window !== 'undefined') {
        if (localStorage.getItem('cart')) {
            cart = JSON.parse(localStorage.getItem('cart'))
        }
        cart.push({
            ...item,
            count: 1
        })
        localStorage.setItem('cart', JSON.stringify(cart))
        next()
    }
}

export const loadToCart = () => {
    if (typeof window !== 'undefined') {
        if (localStorage.getItem('cart')) {
            return JSON.parse(localStorage.getItem('cart'))
        }
    }
}

export const removeItemFromCart = (productId) => {
    let cart = []
    if (typeof window !== 'undefined') {
        cart = JSON.parse(localStorage.getItem('cart'))
    }
    console.log(cart)
    cart = cart.filter(product => {
        return product._id !== productId
    })
    console.log(cart)

    localStorage.setItem('cart', JSON.stringify(cart))
    return cart
}

export const emptyCart = (next) => {
    if (typeof window !== 'undefined') {
        localStorage.removeItem('cart')
        next()
    }
}

export const createOrder = (userId, token, order) => {
    return fetch(`/api/order/create/${userId}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(order)
    }).then(response => {
        return response.json()
    }).catch(err => console.log(err))
}