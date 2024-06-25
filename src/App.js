import logo from './logo.svg';
import React, { useState, useEffect } from 'react';
import './App.css';
import OrderForm from "./components/orderForm";
import OrderTable from "./components/orderTable";
import axios from 'axios';
import AddOrder from "./components/addOrder";
import SearchOrders from "./components/SearchOrders";
import TopOrders from "./components/TopOrders";
function App() {
    const [orders, setOrders] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const addOrder = (newOrder) => {
        setOrders([...orders, newOrder]);
    };
    const fetchOrders = () => {
    axios.get('http://localhost:3000/orders')
      .then(response => setOrders(response.data))
      .catch(error => console.error('Error fetching orders:', error));
    };
    useEffect(() => {
    fetchOrders();
    }, []);
    return (
        <div className="App">
            <h1>Order Management System</h1>
            <OrderForm addOrder={addOrder} />
            <OrderTable orders={orders} />
            <h1>Order List</h1>
            <AddOrder onOrderAdded={fetchOrders} />
            <ul>
            {orders.map(order => (
            <li key={order.id}>
            Order #{order.id} - Product ID: {order.productId} - Quantity: {order.quantity} - Purchase Date: {order.purchaseDate}
            </li>
        ))}
      </ul>
      <h1>Order System</h1>
      <AddOrder onOrderAdded={fetchOrders} />
      <SearchOrders onSearchResults={setSearchResults} />
      <TopOrders />
      <h2>Search Results</h2>
      {searchResults.length === 0 ? (
        <p>No results found</p>
      ) : (
        <ul>
          {searchResults.map(order => (
            <li key={order.id}>
              Order #{order.id} - Product ID: {order.productId} - Quantity: {order.quantity} - Purchase Date: {order.purchaseDate}
            </li>
          ))}
        </ul>
      )}
      <h2>All Orders</h2>
      <ul>
        {orders.map(order => (
          <li key={order.id}>
            Order #{order.id} - Product ID: {order.productId} - Quantity: {order.quantity} - Purchase Date: {order.purchaseDate}
          </li>
        ))}
      </ul>
        </div>
    );
}

export default App;
