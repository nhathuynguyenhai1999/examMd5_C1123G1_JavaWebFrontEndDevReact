import React, { useState } from 'react';

function OrderForm({ addOrder, products }) {
    const [formData, setFormData] = useState({
        orderId: '',
        purchaseDate: '',
        totalAmount: '',
        quantity: '',
        productId: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate fields
        if (new Date(formData.purchaseDate) > new Date()) {
            alert('Purchase date cannot be in the future.');
            return;
        }
        if (formData.quantity <= 0) {
            alert('Quantity must be a positive integer.');
            return;
        }

        const selectedProduct = products.find(p => p.productId === formData.productId);
        const newOrder = {
            ...formData,
            purchaseDate: new Date(formData.purchaseDate),
            totalAmount: parseFloat(formData.totalAmount),
            quantity: parseInt(formData.quantity),
            products: [selectedProduct]
        };

        addOrder(newOrder);

        setFormData({
            orderId: '',
            purchaseDate: '',
            totalAmount: '',
            quantity: '',
            productId: ''
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
            <select name="productId" value={formData.productId} onChange={handleChange} required>
                <option value="">Select a product</option>
                {products.map(product => (
                    <option key={product.productId} value={product.productId}>
                        {product.name} - {product.price} VND
                    </option>
                ))}
            </select><br />

            <button type="submit">Thêm đơn hàng</button>
        </form>
    );
}

export default OrderForm;
