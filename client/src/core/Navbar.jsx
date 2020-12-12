import React from 'react'
import { NavLink, withRouter } from 'react-router-dom'
const Navbar = () => {
    return (
       
            <div className='navbar'>
                <ul className="nav">
                    <li className="nav-item">
                        <NavLink className='nav-link' to='/'>
                            Home
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className='nav-link' to='/cart'>
                            Cart
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className='nav-link' to='/user/dashboard'>
                            Dashboard
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className='nav-link' to='/admin/dashboard'>
                            Admin
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className='nav-link' to='/signup'>
                            Signup
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className='nav-link' to='/signin'>
                            Signin
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className='nav-link' to='/signout'>
                            Signout
                        </NavLink>
                    </li>
                </ul>
            </div>
    )
}

export default withRouter(Navbar)
