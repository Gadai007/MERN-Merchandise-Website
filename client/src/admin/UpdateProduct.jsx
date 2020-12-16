import React, { useState, useEffect } from 'react'
import { updateProduct, getAllCategories, getAProduct } from './helper/adminapicall'
import { isAuthenticated } from '../auth/helper/index'
import Base from '../core/Base'

const UpdateProduct = (props) => {

    const [values, setValues] = useState({
        name: '',
        description: '',
        price: '',
        stock: '',
        photo: '',
        categories: [],
        catergory: '',
        loading: false,
        error: '',
        createdProduct: '',
        formData: new FormData()
    })

    const { user, token } = isAuthenticated()

    const preLoad = (productId) => {
        getAProduct(productId).then(data => {
            if (data.error) {
                setValues(preValues => {
                    return { ...preValues, error: data.error }
                })
            } else {
                getCategories()
                setValues(preValues => {
                    return {
                        ...preValues,
                        name: data.name,
                        description: data.description,
                        price: data.price,
                        catergory: data.category._id,
                        stock: data.stock,
                        formData: new FormData()
                    }
                })
            }
        })
    }

    const getCategories = () => {
        getAllCategories().then(data => {
            if (data.error) {
                setValues(preValues => {
                    return { ...preValues, error: data.error }
                })
            } else {
                setValues({ categories: data, formData: new FormData() })
            }
        })
    }

    useEffect(() => {
        preLoad(props.match.params.productId)
    }, [])

    const onChangeHandler = (event) => {
        let value = ''
        if (event.target.name === 'photo') {
            value = event.target.files[0]
        } else {
            value = event.target.value
        }

        values.formData.set(event.target.name, value)
        setValues(preValues => {
            return { ...preValues, [event.target.name]: value }
        })
    }

    const onSubmitHandler = (event) => {
        event.preventDefault()
        setValues(preValues => {
            return { ...preValues, error: '', loading: true }
        })
        updateProduct(props.match.params.productId, user.id, token, values.formData).then(response => {
            if (response.error) {
                setValues(preValues => {
                    return { ...preValues, error: response.error, loading: false }
                })
            } else {
                setValues(preValues => {
                    return {
                        ...preValues,
                        name: '',
                        description: '',
                        price: '',
                        photo: '',
                        stock: '',
                        loading: false,
                        createdProduct: response.name
                    }
                })
                setTimeout(() => {
                    props.history.push('/admin/dashboard')
                }, 2000)
            }
        }).catch(err => console.log(err))
    }

    const loadingMessage = () => {
        return (
            <div className="row my-3">
                <div className="col-md-6 offset-sm">
                    <div className="alert alert-success"
                        style={{ display: values.loading ? '' : 'none' }}>
                        LOADING....
                    </div>
                </div>
            </div>
        )
    }

    const successMessage = () => {
        return (
            <div className="row my-3">
                <div className="col-md-6 offset-sm">
                    <div className="alert alert-success"
                        style={{ display: values.createdProduct ? '' : 'none' }}>
                        {values.createdProduct} updated successfully
                    </div>
                </div>
            </div>
        )
    }
    const errorMessage = () => {
        return (
            <div className="row my-3">
                <div className="col-md-6 offset-sm">
                    <div className="alert alert-danger"
                        style={{ display: values.error ? '' : 'none' }}>
                        {values.error}
                    </div>
                </div>
            </div>
        )
    }

    const createProductForm = () => {
        return (
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    {loadingMessage()}
                    {successMessage()}
                    {errorMessage()}
                    <form className='product'>
                        <div className="form-group">
                            <label>Add Photo</label>
                            <input
                                className='form-control'
                                type="file"
                                onChange={onChangeHandler}

                                name='photo'
                                accept='image'
                                placeholder='choose a file' />
                        </div>
                        <div className="form-group">
                            <input
                                className='form-control'
                                type="text"
                                onChange={onChangeHandler}
                                placeholder='Enter your product'
                                name='name'
                                value={values.name} />
                        </div>
                        <div className="form-group">
                            <textarea
                                className='form-control'
                                type="email"
                                onChange={onChangeHandler}
                                placeholder='Description'
                                name='description'
                                value={values.description} >
                            </textarea>
                        </div>
                        <div className="form-group">
                            <input
                                className='form-control'
                                type="number"
                                onChange={onChangeHandler}
                                placeholder='price'
                                name='price'
                                value={values.price} />
                        </div>
                        <div className="form-group">
                            <label>Category</label>
                            <select
                                className='form-control'
                                onChange={onChangeHandler}
                                placeholder='Category'
                                name='category' >
                                <option>--SELECT--</option>
                                {values.categories.map(category => (
                                    <option key={category._id} value={category._id}>{category.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <input
                                className='form-control'
                                type="number"
                                onChange={onChangeHandler}
                                placeholder='Stock'
                                name='stock'
                                value={values.stock} />
                        </div>
                        <button
                            className="btn btn-block success"
                            onClick={onSubmitHandler}>Update product</button>
                    </form>
                </div>
            </div>
        )
    }

    return (
        <Base title='Update Product' description='Update a product on your own'>
            {createProductForm()}
        </Base>
    )
}

export default UpdateProduct
