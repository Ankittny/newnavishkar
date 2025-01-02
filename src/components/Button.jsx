import React from 'react';

const Button = ({ buttonName }) => {
    return (
      <div>
        <ul className="list-inline d-flex justify-content-center gap-5">
          <li>
            <button>{buttonName}</button>
          </li>
        </ul>
      </div>
    );
  };

export default Button;