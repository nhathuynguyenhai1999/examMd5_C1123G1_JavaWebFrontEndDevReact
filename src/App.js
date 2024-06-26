import React, { useState, useEffect } from 'react';
import OrderForm from "./components/orderForm";
import OrderTable from "./components/orderTable";
import SearchForm from "./components/searchForm";
import './App.css';

function App() {
    const [orders, setOrders] = useState([]);
    const [products, setProducts] = useState([]);
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [searchCriteria, setSearchCriteria] = useState({ startDate: '', endDate: '', productId: '' });
    const [noResults, setNoResults] = useState(false);
    const [topOrders, setTopOrders] = useState([]);
    const [topN, setTopN] = useState(0);

    useEffect(() => {
        fetch('http://localhost:5000/products')
            .then(response => response.json())
            .then(data => setProducts(data));

        fetch('http://localhost:5000/orders')
            .then(response => response.json())
            .then(data => {
                setOrders(data);
                setFilteredOrders(data);
            });
    }, []);

    const addOrder = (newOrder) => {
        fetch('http://localhost:5000/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newOrder)
        })
        .then(response => response.json())
        .then(order => {
            setOrders([...orders, order]);
            setFilteredOrders([...orders, order]);
            alert('Order added successfully!');
        });
    };

    const searchOrders = (criteria) => {
        let filtered = orders;
        if (criteria.startDate) {
            filtered = filtered.filter(order => new Date(order.purchaseDate) >= new Date(criteria.startDate));
        }
        if (criteria.endDate) {
            filtered = filtered.filter(order => new Date(order.purchaseDate) <= new Date(criteria.endDate));
        }
        if (criteria.productId) {
            filtered = filtered.filter(order => order.products.some(product => product.productId === criteria.productId));
        }
        setFilteredOrders(filtered);
        setNoResults(filtered.length === 0);
    };

    const handleTopNChange = (e) => {
        setTopN(e.target.value);
    };

    const viewTopOrders = () => {
        const sortedOrders = orders.slice().sort((a, b) => b.totalAmount - a.totalAmount);
        const topOrders = sortedOrders.slice(0, topN);
        setTopOrders(topOrders);
        setFilteredOrders([]);
        setNoResults(topOrders.length === 0);
    };

    return (
        <div className="App">
            <h1>Order Management System</h1>
            <OrderForm addOrder={addOrder} products={products} />
            <SearchForm searchOrders={searchOrders} products={products} setSearchCriteria={setSearchCriteria} />
            <div>
                <label>Số lượng top đơn hàng: </label>
                <input type="number" value={topN} onChange={handleTopNChange} />
                <button onClick={viewTopOrders}>Xem top</button>
            </div>
            {noResults ? <p>Không có kết quả</p> : <OrderTable orders={topOrders.length > 0 ? topOrders : filteredOrders} />}
        </div>
    );
}

export default App;
