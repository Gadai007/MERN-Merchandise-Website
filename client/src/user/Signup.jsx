import React, { useState } from 'react'
import Base from '../core/Base'
import { Link } from 'react-router-dom'
import { signup } from '../auth/helper'

const Signup = () => {

    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        error: '',
        success: false
    })

    const onChangeHandler = (event) => {
        const { name, value } = event.target

        setValues(preValues => {
            return { ...preValues, [name]: value }
        })
    }

    const onSubmitHandler = (event) => {
        event.preventDefault()
        const { name, email, password } = values
        signup({ name, email, password })
            .then(response => {
                if (response.error) {
                    setValues(preValues => {
                        return { ...preValues, error: response.error, success: false }
                    })
                } else {
                    setValues(preValues => {
                        return {
                            ...preValues,
                            name: '',
                            email: '',
                            password: '',
                            error: '',
                            success: true
                        }
                    })
                }
            })
            .catch(err => console.log('signup'))
    }

    const successMessage = () => {
        return(
            <div className="row my-3">
                <div className="col-md-6 offset-sm">
                    <div className="alert alert-success"
                        style={{display: values.success ? '' : 'none'}}>
                            New Account Created. Please <Link to='/signin'> signin here</Link>
                    </div>
                </div>
            </div>
        )
    }
    const errorMessage = () => {
        return(
            <div className="row my-3">
                <div className="col-md-6 offset-sm">
                    <div className="alert alert-danger"
                        style={{display: values.error ? '' : 'none'}}>
                           {values.error}
                    </div>
                </div>
            </div>
        )
    }

    const signupForm = () => {
        return (
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    {successMessage()}
                    {errorMessage()}
                    <form>
                        <div className="form-group">
                            <label>Name</label>
                            <input
                                className='form-control'
                                type="text"
                                onChange={onChangeHandler}
                                value={values.name}
                                name='name' />
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <input
                                className='form-control'
                                type="email"
                                onChange={onChangeHandler}
                                value={values.email}
                                name='email' />
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input
                                className='form-control'
                                type="password"
                                onChange={onChangeHandler}
                                value={values.password}
                                name='password' />
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
        <Base
            title='Signup'
            description='signup as an user'>
            {signupForm()}
        </Base>
    )
}

export default Signup
