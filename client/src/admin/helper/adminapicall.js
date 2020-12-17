// create a category
export const createCategory = (userId, token, category) => {
    return fetch(`/api/category/create/${userId}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(category)
    })
        .then(response => {
            return response.json()
        })
        .catch(err => console.log(err))
}

//get all categories
export const getAllCategories = () => {
    return fetch(`/api/categories`, {
        method: "GET"
    }).then(response => {
            return response.json()
        })
        .catch(err => console.log(err))
}

//update a category
export const updateCategory = (categoryId, userId, token, category) => {
    return fetch(`/api/category/${categoryId}/${userId}`, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(category)
    }).then(response => {
        return response.json()
    }).catch(err => console.log(err))
}

//get a category
export const getACategory = (categoryId) => {
    return fetch(`/api/category/${categoryId}`, {
        method: 'GET'
    }).then(response => {
        return response.json()
    }).catch(err => console.log(err))
}

//delete a category
export const deleteCategory = (categoryId, userId, token) => {
    return fetch(`/api/category/${categoryId}/${userId}`, {
        method: 'DELETE',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        }
    }).then(response => {
        return response.json()
    }).catch(err => console.log(err))
}

//create a product
export const createProduct = (userId, token, product) => {
    return fetch(`/api/product/create/${userId}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: product
    })
        .then(response => {
            return response.json()
        })
        .catch(err => console.log(err))
}

//get all products
export const getAllProducts = () => {
    return fetch(`/api/products`, {
        method: "GET"
    })
        .then(response => {
            return response.json()
        })
        .catch(err => console.log(err))
}

//delete a product

export const deleteProduct = (productId, userId, token) => {
    return fetch(`/api/product/${productId}/${userId}`, {
        method: 'DELETE',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        }
    })
        .then(response => {
            return response.json()
        })
        .catch(err => console.log(err))
}

//get a product
export const getAProduct = (productId) => {
    return fetch(`/api/product/${productId}`, {
        method: "GET"
    })
        .then(response => {
            return response.json()
        })
        .catch(err => console.log(err))
}

//update a product

export const updateProduct = (productId, userId, token, product) => {
    return fetch(`/api/product/${productId}/${userId}`, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: product
    })
        .then(response => {
            return response.json()
        })
        .catch(err => console.log(err))
}