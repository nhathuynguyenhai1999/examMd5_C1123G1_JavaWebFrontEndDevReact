import React, { useState } from 'react';

function OrderForm({ addOrder }) {
    const [formData, setFormData] = useState({
        orderId: '',
        purchaseDate: '',
        totalAmount: '',
        quantity: '',
        productId: '',
        productName: '',
        price: '',
        category: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newOrder = {
            ...formData,
            purchaseDate: new Date(formData.purchaseDate),
            totalAmount: parseFloat(formData.totalAmount),
            quantity: parseInt(formData.quantity),
            price: parseFloat(formData.price),
            products: [{
                productId: formData.productId,
                name: formData.productName,
                price: parseFloat(formData.price),
                category: formData.category
            }]
        };
        addOrder(newOrder);
        setFormData({
            orderId: '',
            purchaseDate: '',
            totalAmount: '',
            quantity: '',
            productId: '',
            productName: '',
            price: '',
            category: ''
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>Mã đơn hàng:</label>
            <input type="text" name="orderId" value={formData.orderId} onChange={handleChange} required /><br />

            <label>Ngày mua:</label>
            <input type="date" name="purchaseDate" value={formData.purchaseDate} onChange={handleChange} required /><br />

            <label>Tổng tiền:</label>
            <input type="number" name="totalAmount" value={formData.totalAmount} onChange={handleChange} required /><br />

            <label>Số lượng:</label>
            <input type="number" name="quantity" value={formData.quantity} onChange={handleChange} required /><br />

            <label>Mã sản phẩm:</label>
            <input type="text" name="productId" value={formData.productId} onChange={handleChange} required /><br />

            <label>Tên sản phẩm:</label>
            <input type="text" name="productName" value={formData.productName} onChange={handleChange} required /><br />

            <label>Giá:</label>
            <input type="number" name="price" value={formData.price} onChange={handleChange} required /><br />

            <label>Loại sản phẩm:</label>
            <input type="text" name="category" value={formData.category} onChange={handleChange} required /><br />

            <button type="submit">Thêm đơn hàng</button>
        </form>
    );
}

export default OrderForm;
