import React from 'react'

const Image = (props) => {
    return (
        <div>
            <img src={`/api/product/photo/${props.id}`} className="card-img-top" alt=''/>
        </div>
    )
}

export default Image
