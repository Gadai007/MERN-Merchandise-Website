import React from 'react'
import Navbar from './Navbar'

const Base = (props) => {
    return (
        <div>
            <Navbar/>
            <div className="container-fluid">
                <div className="jumbotron text-center">
                    <h2 className="display-4">{props.title}</h2>
                    <p className="lead">{props.description}</p>
                </div>
                <div className="container">{props.children}</div>
            </div>
        </div>
    )
}

export default Base
