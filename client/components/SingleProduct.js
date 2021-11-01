import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import history from '../history';
import { fetchSingleProduct, removedProduct } from '../store';


const SingleProduct = ({
  product,
  fetchProduct,
  match,
  deleteProduct
}) => {
  useEffect(() => {
    fetchProduct(match.params.id)
  }, [])

  return (
    <div className="single-product-container">
      <div className="single-product-img-container">
        <img className="single-product-img" src={product.imageUrl} />
        <button
        className="btn-delete"
        type="button"
        onClick={() => {
          deleteProduct(product.id);
          history.goBack();
        }}
      >
        DELETE
      </button>
      </div>
      <div className="single-product-info-container">
        <a className="product-link" href={`${product.url}`}>
          {product.name}
        </a>
        <div className="single-product-description">
          {product.description}
        </div>
      </div>
    </div>
  )
}

const mapState = (state) => {
  return {
    product: state.singleProduct,
  }
}
const mapDispatch = (dispatch) => {
  return {
    fetchProduct: (productId) => dispatch(fetchSingleProduct(productId)),
    deleteProduct: (productId) => dispatch(removedProduct(productId))
  }
}

export default connect(mapState, mapDispatch)(SingleProduct);
