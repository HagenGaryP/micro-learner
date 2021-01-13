import React, { useState } from "react";
import { newTopic } from "../store";
import { connect } from "react-redux";
import { AddTopicForm } from "./index";

const AddTopic = ({ addToTopicList }) => {
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
    // adding form submission's info to Topic list
    addToTopicList(info);

    // clearing form's state
    setCategory("");
    setImageUrl("");
    setUrl("");
    setDescription("");
    setName("");
  };

  return (
    <div className="form-container">
      <AddTopicForm
        handleSubmit={handleSubmit}
        name={name}
        category={category}
        imageUrl={imageUrl}
        url={url}
        description={description}
        handleChange={handleChange}
      />
    </div>
  );
};

const mapDispatch = (dispatch) => ({
  addToTopicList: (event) => dispatch(newTopic(event)),
});

export default connect(null, mapDispatch)(AddTopic);
