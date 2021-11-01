import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { ProductPreview } from './index';
import { fetchProducts, newProduct, fetchSearchedProducts } from '../store';

const AllProducts = ({ products, deleteProduct, getProducts, addProduct, searchProducts }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [data, setData] = useState([]);

  useEffect(() => {
    getProducts();
    setData([...data, products])
  }, []);

  useEffect(() => {
    getProducts();
  }, [data]);

  // handle Searched Term
  const handleSearch = async () => {
    try {
      const newData = await searchProducts(searchTerm);
      console.log('newData = ', newData);
      setData([...data, newData])
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="all-products-start">
      <div className="search-container">
        <h1 className="search-header">Search More Content</h1>
        <form
          onSubmit={() => handleSearch(searchTerm)}
        >
          <label>
            <input
              name="search"
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </label>
          <button
            className="btn-search"
            type="button"
            onClick={() => handleSearch(searchTerm)}
          >
            Search
          </button>
        </form>

      </div>
      {/* ---------- products ----------*/}
      <div className="all-products-container">
        {Array.isArray(products) &&
          products.map((product) => {
            return (
              <ProductPreview
                key={product.id}
                product={product}
              />
            );
          })}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  products: state.products,
});

const mapDispatch = (dispatch) => ({
  getProducts: () => dispatch(fetchProducts()),
  addProduct: (info) => dispatch(newProduct(info)),
  searchProducts: (val) => dispatch(fetchSearchedProducts(val))
});

export default connect(mapStateToProps, mapDispatch)(AllProducts);
