import React from 'react'
import Base from '../core/Base'
import { isAuthenticated } from '../auth/helper/index'
import { Link } from 'react-router-dom'

const AdminDashBoard = () => {

    const { user: { name, email } } = isAuthenticated()

    const adminLeftSide = () => {
        return (
            <div className="card admin">
                <div className="card-body">
                    <h3 className="card-title color">Admin Information</h3>
                    <h5 className="card-text color">Name: {name}</h5>
                    <h5 className="card-text color">Email: {email}</h5>
                </div>
            </div>
        )
    }

    const adminRightSide = () => {
        return (
            <div className="card admin">
                <div className="card-body">
                    <h3 className="card-title color">Admin Navigation</h3>
                    <h5 className="card-text">
                        <Link to="/admin/create/category" className="nav-link">
                            Create Categories
                        </Link>
                    </h5>
                    <h5 className="card-text">
                        <Link to="/admin/create/product" className="nav-link">
                            Create Product
                        </Link>
                    </h5>
                    <h5 className="card-text">
                        <Link to="/admin/products" className="nav-link">
                            Manage Products
                        </Link>
                    </h5>
                    <h5 className="card-text">
                        <Link to="/admin/orders" className="nav-link">
                            Manage Orders
                        </Link>
                    </h5>
                </div>
            </div>
        )
    }

    return (
        <Base title='Welcome to Admin DashBoard' description='Manage all your products'>
            <div className="row">
                <div className="col-3">{adminLeftSide()}</div>
                <div className="col-9">{adminRightSide()}</div>
            </div>
        </Base>
    )
}

export default AdminDashBoard
