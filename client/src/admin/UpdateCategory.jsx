import React, {useState, useEffect } from 'react'
import { getACategory, updateCategory } from './helper/adminapicall'
import { isAuthenticated } from '../auth/helper/index'
import Base from '../core/Base'


const UpdateCategory = (props) => {

    const [name, setName] = useState("")
    const [error, setError] = useState(false)
    const [success, setSuccess] = useState(false)

    const { user, token } = isAuthenticated()

    const preLoad = (categoryId) => {
        getACategory(categoryId).then(response => {
            if(response.error){
                setError(true)
            }else{
                setName(response.name)
            }
        })
    }

    useEffect(() => {
        preLoad(props.match.params.categoryId)
    }, [])

    const onChangeHandler = (event) => {
        const { value } = event.target
        setName(value)
    }

    const onSubmitHandler = (event) => {
        event.preventDefault()
        updateCategory(props.match.params.categoryId, user.id, token, { name })
            .then(data => {
                if (data.error) {
                    setError(true)
                } else {
                    setSuccess(true)
                    setName('')
                }
            })
            .catch(err => console.log(err))
        setTimeout(() => {
            props.history.push('/admin/dashboard')
        }, 2000)
    }

    const successMessage = () => {
        if (success) {
            return (
                <div className="row my-3">
                    <div className="col-md-6 offset-sm">
                        <div className="alert alert-success">
                            Category updated successfully
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
                            Failed to update category
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
                            onClick={onSubmitHandler}>Update</button>
                    </form>
                </div>
            </div>
        )
    }

    return (
        <Base title='Update Category' description='Update your category'>
            {categoryForm()}
        </Base>
    )
}

export default UpdateCategory
