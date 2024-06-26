import React from 'react';

function OrderTable({ orders }) {
    const formatDate = (date) => {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    const sortedOrders = orders.slice().sort((a, b) => a.totalAmount - b.totalAmount);

    return (
        <table>
            <thead>
                <tr>
                    <th>STT</th>
                    <th>Mã đơn hàng</th>
                    <th>Tên sản phẩm</th>
                    <th>Ngày mua</th>
                    <th>Giá</th>
                    <th>Số lượng</th>
                    <th>Tổng tiền</th>
                </tr>
            </thead>
            <tbody>
                {sortedOrders.map((order, index) => (
                    order.products.map((product, productIndex) => (
                        <tr key={`${order.orderId}-${productIndex}`}>
                            <td>{index + 1}</td>
                            <td>{order.orderId}</td>
                            <td>{product.name}</td>
                            <td>{formatDate(new Date(order.purchaseDate))}</td>
                            <td>{product.price}</td>
                            <td>{order.quantity}</td>
                            <td>{order.totalAmount}</td>
                        </tr>
                    ))
                ))}
            </tbody>
        </table>
    );
}

export default OrderTable;
