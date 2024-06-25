// src/SearchOrders.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SearchOrders = ({ onSearchResults }) => {
  const [products, setProducts] = useState([]);
  const [productId, setProductId] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3000/products')
      .then(response => setProducts(response.data))
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  const handleSearch = (event) => {
    event.preventDefault();
    axios.get('http://localhost:3000/orders/search', {
      params: {
        productId: productId ? parseInt(productId) : undefined,
        startDate,
        endDate
      }
    })
      .then(response => {
        if (response.data.message) {
          setMessage(response.data.message);
          onSearchResults([]);
        } else {
          setMessage('');
          onSearchResults(response.data);
        }
      })
      .catch(error => {
        setMessage('Error fetching search results');
        onSearchResults([]);
      });
  };

  return (
    <div>
      <h2>Search Orders</h2>
      <form onSubmit={handleSearch}>
        <div>
          <label>Product:</label>
          <select value={productId} onChange={(e) => setProductId(e.target.value)}>
            <option value="">Select a product</option>
            {products.map(product => (
              <option key={product.id} value={product.id}>{product.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Start Date:</label>
          <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
        </div>
        <div>
          <label>End Date:</label>
          <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
        </div>
        <button type="submit">Search</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default SearchOrders;
