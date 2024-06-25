// src/AddOrder.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddOrder = ({ onOrderAdded }) => {
  const [products, setProducts] = useState([]);
  const [productId, setProductId] = useState('');
  const [quantity, setQuantity] = useState('');
  const [purchaseDate, setPurchaseDate] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3000/products')
      .then(response => setProducts(response.data))
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://localhost:3000/orders', {
      productId: parseInt(productId),
      quantity: parseInt(quantity),
      purchaseDate
    })
      .then(response => {
        setMessage(response.data.message);
        onOrderAdded();
      })
      .catch(error => {
        setMessage(error.response?.data?.error || 'Error adding order');
      });
  };

  return (
    <div>
      <h2>Add New Order</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Product:</label>
          <select value={productId} onChange={(e) => setProductId(e.target.value)} required>
            <option value="">Select a product</option>
            {products.map(product => (
              <option key={product.id} value={product.id}>{product.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Quantity:</label>
          <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} min="1" required />
        </div>
        <div>
          <label>Purchase Date:</label>
          <input type="date" value={purchaseDate} onChange={(e) => setPurchaseDate(e.target.value)} required />
        </div>
        <button type="submit">Add Order</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default AddOrder;
