import React, { useState } from 'react'

const Button = ({buttonsData}) => {
   
    return (
        <div>
        <ul className="list-inline d-flex justify-content-center gap-5">
            {/* Map through the buttonsData array and render buttons */}
            {buttonsData.map((item, index) => (
                <li key={index}>
                    <button>{item.name}</button>
                </li>
            ))}
        </ul>
    </div>
    )
}

export default Button
