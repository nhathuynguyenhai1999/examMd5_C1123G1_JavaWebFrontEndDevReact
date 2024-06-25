// src/TopOrders.js
import React, { useState } from 'react';
import axios from 'axios';

const TopOrders = () => {
  const [limit, setLimit] = useState(10);
  const [topOrders, setTopOrders] = useState([]);

  const fetchTopOrders = () => {
    axios.get('http://localhost:3000/orders/top', { params: { limit } })
      .then(response => setTopOrders(response.data))
      .catch(error => console.error('Error fetching top orders:', error));
  };

  return (
    <div>
      <h2>Top Orders</h2>
      <div>
        <label>Number of top orders to display:</label>
        <input type="number" value={limit} onChange={(e) => setLimit(e.target.value)} min="1" />
        <button onClick={fetchTopOrders}>View Top Orders</button>
      </div>
      {topOrders.length === 0 ? (
        <p>No results found</p>
      ) : (
        <ul>
          {topOrders.map(order => (
            <li key={order.id}>
              Order #{order.id} - Product ID: {order.productId} - Quantity: {order.quantity} - Purchase Date: {order.purchaseDate} - Total Price: ${order.totalPrice}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TopOrders;
