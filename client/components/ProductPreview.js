import React, { useState } from 'react';
import history from '../history';


function ProductPreview({ product }) {
  const [hoverState, setHoverState] = useState(false);

  return (
    <div
      className="product-card hover-links"
      onClick={() => history.push(`/products/${product.id}`)}
      onMouseEnter={() => setHoverState(true)}
      onMouseLeave={() => setHoverState(false)}
    >
    <div
    >
    {
      hoverState &&
      <div>
        <h2>{product.category}</h2>
        {product.description}
      </div>
    }
      <span>
        <img className="product-img" src={product.imageUrl} />
      <div className="product-card-textarea">
        <p className="product-card-name">
          {product.name}
        </p>
      </div>
      </span>
    </div>
    </div>
  );
}

export default ProductPreview;
