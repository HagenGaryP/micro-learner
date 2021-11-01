import React, { useState } from "react";
import { connect } from "react-redux";
import history from '../history';
import { newProduct } from "../store";
import { AddProductForm } from "./index";

const AddProduct = ({ addToProductList }) => {
  // state variables
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");

  const handleChange = (event) => {
    if (event.target.name === "category") {
      setCategory(event.target.value);
    } else if (event.target.name === "imageUrl") {
      setImageUrl(event.target.value);
    } else if (event.target.name === "url") {
      setUrl(event.target.value);
    } else if (event.target.name === "description") {
      setDescription(event.target.value);
    } else if (event.target.name === "name") {
      setName(event.target.value);
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const info = {
      name: event.target.name.value,
      category: event.target.category.value,
      url: event.target.url.value,
      description: event.target.description.value,
      imageUrl: event.target.imageUrl.value,
    };
    // adding form submission's info to Product list
    addToProductList(info);

    // clearing form's state
    setCategory("");
    setImageUrl("");
    setUrl("");
    setDescription("");
    setName("");
  };

  return (
    <div>
      <div className="redirect-all-products">
        <button
          type="button"
          onClick={() => history.push('/products')}
        >
          View All Products
        </button>
      </div>
      <div className="form-container">
        <AddProductForm
          handleSubmit={handleSubmit}
          name={name}
          category={category}
          imageUrl={imageUrl}
          url={url}
          description={description}
          handleChange={handleChange}
        />
      </div>
    </div>
  );
};

const mapDispatch = (dispatch) => ({
  addToProductList: (event) => dispatch(newProduct(event)),
});

export default connect(null, mapDispatch)(AddProduct);
