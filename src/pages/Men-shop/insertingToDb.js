import React, { useState } from 'react';
import Axios from 'axios';

const Form = () => {
  const [formData, setFormData] = useState([]);
  const [Q, setQ] = useState(1);

  const handleImageChange = (e, index) => {
    const file = e.target.files[0];
    const updatedFormData = [...formData];
    updatedFormData[index] = {
      ...updatedFormData[index],
      image: file,
    };
    setFormData(updatedFormData);
  };

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const updatedFormData = [...formData];
    updatedFormData[index] = {
      ...updatedFormData[index],
      [name]: value,
    };
    setFormData(updatedFormData);
  };

  const handleSubmit = () => {
    formData.forEach((data) => {
      const { product_name, category_id, product_body_part, price, image } = data;

      const formData = new FormData();
      formData.append('product_name', product_name);
      formData.append('category_id', category_id);
      formData.append('product_body_part', product_body_part);
      formData.append('price', price);
      formData.append('imageFile', image);

      console.log(formData);

      Axios.post('http://192.168.250.52:3000/put/data', formData)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.error(error);
        });
    });
  };

  const updateQuantity = (quantity) => {
    setQ(quantity);
    setFormData(Array.from({ length: quantity }, () => ({})));
  };

  const forms = () => {
    const formInputs = [];
    for (let i = 0; i < Q; i++) {
      const formInput = (
        <div key={i}>
          <input
            type="text"
            placeholder="product_name"
            name="product_name"
            onChange={(e) => handleInputChange(e, i)}
          />
          <input
            type="text"
            placeholder="category_id"
            name="category_id"
            onChange={(e) => handleInputChange(e, i)}
          />
          <input
            type="text"
            placeholder="price"
            name="price"
            onChange={(e) => handleInputChange(e, i)}
          />
          <input
            type="text"
            placeholder="product body part"
            name="product_body_part"
            onChange={(e) => handleInputChange(e, i)}
          />
          <input
            type="file"
            name="imageFile"
            onChange={(e) => handleImageChange(e, i)}
          />
          <br />
        </div>
      );
      formInputs.push(formInput);
    }
    return formInputs;
  };

  return (
    <>
      <div>
        <input
          type="text"
          placeholder="Set Quantity"
          name="product_name"
          onChange={(e) => updateQuantity(e.target.value)}
        />
      </div>
      <div>
        {forms()}
        <button type="submit" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </>
  );
};

export default Form;