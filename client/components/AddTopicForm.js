import React from 'react'
import {Form, Button} from 'react-bootstrap'

const AddProductForm = ({
  handleSubmit,
  handleChange,
  name,
  category,
  imageUrl,
  url,
  description
}) => {
  return (
    <div>
      <Form key="submit-form" onSubmit={handleSubmit}>
        <Form.Group controlId="formTitle">
          <Form.Label> Link Name:</Form.Label>
          <Form.Control
            name="name"
            type="text"
            value={name}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="formCategory">
          <Form.Label> Category: </Form.Label>
          <Form.Control
            name="category"
            type="text"
            value={category}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="formImageUrl">
          <Form.Label> Thumbnail / Cover Image URL: </Form.Label>
          <Form.Control
            name="imageUrl"
            type="text"
            value={imageUrl}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="formUrl">
          <Form.Label> Topic URL: </Form.Label>
          <Form.Control
            name="url"
            type="text"
            value={url}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="formDescription">
          <Form.Label> description: </Form.Label>
          <Form.Control
            name="description"
            type="text"
            value={description}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  )
}

export default AddProductForm
