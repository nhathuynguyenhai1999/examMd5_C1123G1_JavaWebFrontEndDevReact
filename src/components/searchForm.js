import React, { useState } from 'react';

function SearchForm({ searchOrders, products, setSearchCriteria }) {
    const [formData, setFormData] = useState({
        startDate: '',
        endDate: '',
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
        setSearchCriteria(formData);
        searchOrders(formData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>Từ ngày:</label>
            <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} /><br />

            <label>Đến ngày:</label>
            <input type="date" name="endDate" value={formData.endDate} onChange={handleChange} /><br />

            <label>Sản phẩm:</label>
            <select name="productId" value={formData.productId} onChange={handleChange}>
                <option value="">Chọn sản phẩm</option>
                {products.map(product => (
                    <option key={product.productId} value={product.productId}>
                        {product.name}
                    </option>
                ))}
            </select><br />

            <button type="submit">Tìm kiếm</button>
        </form>
    );
}

export default SearchForm;
