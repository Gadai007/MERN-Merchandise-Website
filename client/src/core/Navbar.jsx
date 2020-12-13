import React, { Fragment } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { isAuthenticated, signout } from '../auth/helper/index'

const Navbar = (props) => {
    return (

        <div className='navbar'>
            <ul className="nav">
                <li className="nav-item">
                    <Link className='nav-link' to='/'>
                        Home
                        </Link>
                </li>
                <li className="nav-item">
                    <Link className='nav-link' to='/cart'>
                        Cart
                        </Link>
                </li>
                {isAuthenticated() && isAuthenticated().user.role === 0 && (
                    <li className="nav-item">
                        <Link className='nav-link' to='/user/dashboard'>
                            Dashboard
                        </Link>
                    </li>
                )}
                {isAuthenticated() && isAuthenticated().user.role === 1 && (
                    <li className="nav-item">
                        <Link className='nav-link' to='/admin/dashboard'>
                            Admin
                        </Link>
                    </li>
                )}
                {!isAuthenticated() && (
                    <Fragment>
                        <li className="nav-item">
                            <Link className='nav-link' to='/signup'>
                                Signup
                        </Link>
                        </li>
                        <li className="nav-item">
                            <Link className='nav-link' to='/signin'>
                                Signin
                        </Link>
                        </li>
                    </Fragment>
                )}
                {isAuthenticated() && (<li className="nav-item" onClick={() => signout(() => { props.history.push('/') })}>
                    <Link className='nav-link' to='/signout'>
                        Signout
                        </Link>
                </li>)}
            </ul>
        </div>
    )
}

export default withRouter(Navbar)
