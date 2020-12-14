import React, { useState } from 'react'
import Base from '../core/Base'
import { isAuthenticated } from '../auth/helper/index'
import { createCategory } from './helper/adminapicall'

const AddCategory = () => {
    const [name, setName] = useState("")
    const [error, setError] = useState(false)
    const [success, setSuccess] = useState(false)

    const { user, token } = isAuthenticated()

    const onChangeHandler = (event) => {
        const { value } = event.target
        setName(value)
    }

    const onSubmitHandler = (event) => {
        event.preventDefault()
        createCategory(user.id, token, { name })
            .then(data => {
                if (data.error) {
                    setError(true)
                } else {
                    setSuccess(true)
                    setName('')
                }
            })
    }

    const successMessage = () => {
        if (success) {
            return (
                <div className="row my-3">
                    <div className="col-md-6 offset-sm">
                        <div className="alert alert-success">
                            Category added successfully
                        </div>
                    </div>
                </div>
            )
        }
    }

    const errorMessage = () => {
        if (error) {
            return (
                <div className="row my-3">
                    <div className="col-md-6 offset-sm">
                        <div className="alert alert-danger">
                            Failed to add category
                        </div>
                    </div>
                </div>
            )
        }
    }

    const categoryForm = () => {
        return (
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    {successMessage()}
                    {errorMessage()}
                    <form>
                        <div className="form-group">
                            <label>Category Name</label>
                            <input
                                className='form-control'
                                type="text"
                                placeholder='Ex: Summer'
                                name='name'
                                value={name}
                                onChange={onChangeHandler} />
                        </div>
                        <button
                            className="btn btn-block success"
                            onClick={onSubmitHandler}>Submit</button>
                    </form>
                </div>
            </div>
        )
    }

    return (
        <Base title='Create a category' description='Add a category of your own'>
            {categoryForm()}
        </Base>
    )
}

export default AddCategory
