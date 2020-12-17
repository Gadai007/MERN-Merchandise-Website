import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Base from '../core/Base'
import { getAllCategories, deleteCategory } from './helper/adminapicall'
import { isAuthenticated } from '../auth/helper/index'


const ManageCategories = () => {
    const [categories, setCategories] = useState([])

    const { user, token } = isAuthenticated()

    const preLoad = () => {
        getAllCategories().then(response => {
            if (response.error) {
                console.log(response.error)
            } else {
                setCategories(response)
            }
        })
    }

    useEffect(() => {
        preLoad()
    }, [])

    const deleteCategoryHandler = (categoryId) => {
        deleteCategory(categoryId, user.id, token).then(response => {
            if (response.error) {
                console.log(response.error)
            } else {
                preLoad()
            }
        })
    }

    return (
        <Base title='Manage Categories' description='Manage your categories here'>
            <h2 className="mb-4">All Categories:</h2>
            <div className="row products">
                <div className="col-12">
                    <h2 className="text-center text-white my-3">{categories.length ? `Total ${categories.length} categories` : 'No Categories present'}</h2>

                    {categories.map((category, index) => {
                        return (
                            <div key={index} className="row text-center mb-2 ">
                                <div className="col-4">
                                    <h3 className="text-white text-left">{category.name}</h3>
                                </div>
                                <div className="col-4">
                                    <Link
                                        className="btn btn-success"
                                        to={`/admin/category/update/${category._id}`}
                                    >
                                        <span className="">Update</span>
                                    </Link>
                                </div>
                                <div className="col-4">
                                    <button
                                        onClick={() => {
                                            deleteCategoryHandler(category._id);
                                        }}
                                        className="btn btn-danger"
                                    >
                                        Delete
                                    </button>
                                </div>
                                <hr />
                            </div>
                        );
                    })}
                </div>
            </div>
        </Base>
    )
}

export default ManageCategories
