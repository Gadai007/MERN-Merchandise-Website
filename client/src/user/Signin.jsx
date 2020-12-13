import React, { useState } from 'react'
import Base from '../core/Base'
import { Redirect } from 'react-router-dom'
import { signin, isAuthenticated, authenticate } from '../auth/helper/index'

const Signin = () => {

    const [values, setValues] = useState({
        email: 'deb@gmail.com',
        password: '12345',
        error: '',
        loading: false,
        didRedirect: false
    })

    const { user } = isAuthenticated()

    const onChangeHandler = (event) => {
        const { name, value } = event.target

        setValues(preValues => {
            return { ...preValues, [name]: value }
        })
    }

    const onSubmitHandler = (event) => {
        event.preventDefault()
        const { email, password } = values
        setValues({ ...values, loading: true })
        signin({ email, password })
            .then(response => {
                if (response.error) {
                    setValues({ ...values, error: response.error, loading: false })
                } else {
                    authenticate(response, () => {
                        setValues({ ...values, didRedirect: true })
                    })
                }
            })
            .catch(err => console.log('signin failed'))
    }

    const performRedirect = () => {
        if(values.didRedirect){
            if(user && user.role === 1){
                return <Redirect to='/admin/dashboard'/>
            }else{
                return <Redirect to='/user/dashboard'/>
            }
        }

        if(isAuthenticated()){
            return <Redirect to='/'/>
        }
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

    const signinForm = () => {
        return (
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    {loadingMessage()}
                    {errorMessage()}
                    <form>
                        <div className="form-group">
                            <label>Email</label>
                            <input
                                className='form-control'
                                type="email"
                                name='email'
                                value={values.email}
                                onChange={onChangeHandler} />
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input
                                className='form-control'
                                type="password"
                                name='password'
                                value={values.password}
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
        <Base
            title='Signin'
            description='signin an user'>
            {signinForm()}
            {performRedirect()}
        </Base>
    )
}

export default Signin