import { useEffect, useState } from "react";
import axios from 'axios';
import "./Products.css";


export default function Orders() {
    const [order, setOrder] = useState({
        id: null,
        orderDate: new Date().toISOString(),
        totalAmount: 0,
        userId: "",
        items: [], // Array of {productId, quantity}
        shippingAddress: "",
        paymentMethod: "credit_card"
    });

    // Initialize arrays with empty arrays instead of undefined
    const [orders, setOrders] = useState([]);
    const [products, setProducts] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);

    useEffect(() => {
        // Fetch orders
        axios.get("http://localhost:8000/orders")
            .then((response) => {
                console.log(response.data, "Orders ..");
                setOrders(response.data || []); // Ensure we set an empty array if null/undefined
            })
            .catch(error => {
                console.error("Error fetching orders:", error);
                setOrders([]); // Set empty array on error
            });

        // Fetch products for dropdown
        axios.get("http://localhost:8000/products")
            .then((response) => {
                console.log(response.data, "Products ..");
                setProducts(response.data || []); // Ensure we set an empty array if null/undefined
            })
            .catch(error => {
                console.error("Error fetching products:", error);
                setProducts([]); // Set empty array on error
            });
    }, []);

    // Calculate total amount whenever selected items change
    useEffect(() => {
        const total = selectedItems?.reduce((sum, item) => {
            return sum + (item.price * item.quantity);
        }, 0);
        console.log(selectedItems, "Selected Items");
        
        setOrder(prev => ({ 
            ...prev, 
            totalAmount: total,
            items: selectedItems?.map(item => ({
                productId: item.productId,
                quantity: item.quantity
            }))
        }));
    }, [selectedItems]);

    const generateOrderId = () => {
        const timestamp = Date.now();
        const random = Math.floor(Math.random() * 1000);
        return `ORD-${timestamp}-${random}`;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setOrder({ ...order, [name]: value });
    };

    const handleProductSelect = (e) => {
        const productId = Number(e.target.value);
        if (!productId) return;
        console.log(productId, "Product Id");
        console.log(products, "Products");

        
        const product = products.find(p => p.id == productId);
        console.log(product, "Product");
        
        if (product) {
            // Check if product already exists in cart
            const existingItem = selectedItems.find(item => item.productId === productId);
            
            if (!existingItem) {
                // Add new item to cart
                setSelectedItems([
                    ...selectedItems,
                    {
                        productId: product.id,
                        name: product.name,
                        price: product.price,
                        quantity: 1
                    }
                ]);
            }
        }
    };

    const handleQuantityChange = (productId, newQuantity) => {
        const quantity = parseInt(newQuantity);
        if (quantity < 1) return;

        setSelectedItems(selectedItems.map(item => 
            item.productId === productId 
                ? { ...item, quantity: quantity }
                : item
        ));
    };

    const removeProduct = (productId) => {
        setSelectedItems(selectedItems.filter(item => item.productId !== productId));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newOrder = {
            ...order,
            id: generateOrderId(),
            orderDate: new Date().toISOString()
        };

        axios.post("http://localhost:8000/orders", newOrder).then((response) => {
            console.log("Order added successfully...");
            axios.get("http://localhost:8000/orders").then((response) => {
                setOrders(response.data);
            });
            // Reset form
            setOrder({
                id: null,
                orderDate: new Date().toISOString(),
                totalAmount: 0,
                userId: "",
                items: [],
                shippingAddress: "",
                paymentMethod: "credit_card"
            });
            setSelectedItems([]);
        });
    };

    // Add this CSS to your Products.css file
    const cartStyles = {
        selectedProducts: {
            margin: '20px 0',
            padding: '15px',
            border: '1px solid #ddd',
            borderRadius: '5px'
        },
        productItem: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '10px',
            marginBottom: '10px',
            backgroundColor: '#f9f9f9',
            borderRadius: '4px'
        },
        quantityInput: {
            width: '60px',
            marginLeft: '10px',
            padding: '5px'
        },
        removeButton: {
            backgroundColor: '#ff4444',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            padding: '5px 10px',
            cursor: 'pointer'
        }
    };

    return (
        <div className="products-container">
            <div className="add-product order-form">
                <h2>Create New Order</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>User ID:</label>
                        <input 
                            type="text" 
                            name="userId" 
                            onChange={handleChange} 
                            value={order.userId} 
                            placeholder="Enter User ID" 
                            required 
                        />
                    </div>

                    <div className="form-group">
                        <label>Add Products:</label>
                        <select 
                            onChange={handleProductSelect}
                            className="product-select"
                            value=""
                        >
                            <option value="">Select a product to add</option>
                            {products && products.map(product => (
                                <option key={product.id} value={product.id}>
                                    {product.name} - ${product.price}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Cart/Selected Products Section */}
                    {selectedItems.length > 0 && (
                        <div style={cartStyles.selectedProducts}>
                            <h3>Shopping Cart</h3>
                            {selectedItems.map(item => (
                                <div key={item.productId} style={cartStyles.productItem}>
                                    <div>
                                        <span>{item.name}</span>
                                        <span> - ${item.price}</span>
                                    </div>
                                    <div>
                                        <input 
                                            type="number"
                                            min="1"
                                            value={item.quantity}
                                            onChange={(e) => handleQuantityChange(item.productId, e.target.value)}
                                            style={cartStyles.quantityInput}
                                        />
                                        <button 
                                            type="button"
                                            onClick={() => removeProduct(item.productId)}
                                            style={cartStyles.removeButton}
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            ))}
                            <div style={{ marginTop: '10px', fontWeight: 'bold' }}>
                                Total: ${selectedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2)}
                            </div>
                        </div>
                    )}

                    <div className="form-group total-amount">
                        <label>Total Amount:</label>
                        <input 
                            type="number" 
                            value={order.totalAmount} 
                            readOnly 
                            className="readonly-input"
                        />
                    </div>

                    <div className="form-group">
                        <label>Shipping Address:</label>
                        <textarea 
                            name="shippingAddress" 
                            onChange={handleChange} 
                            value={order.shippingAddress} 
                            placeholder="Enter Shipping Address"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Payment Method:</label>
                        <div className="radio-group">
                            <label>
                                <input 
                                    type="radio" 
                                    name="paymentMethod" 
                                    value="credit_card" 
                                    checked={order.paymentMethod === "credit_card"}
                                    onChange={handleChange}
                                /> Credit Card
                            </label>
                            <label>
                                <input 
                                    type="radio" 
                                    name="paymentMethod" 
                                    value="debit_card" 
                                    checked={order.paymentMethod === "debit_card"}
                                    onChange={handleChange}
                                /> Debit Card
                            </label>
                            <label>
                                <input 
                                    type="radio" 
                                    name="paymentMethod" 
                                    value="upi" 
                                    checked={order.paymentMethod === "upi"}
                                    onChange={handleChange}
                                /> UPI
                            </label>
                        </div>
                    </div>

                    <div className="button-group">
                        <button type="submit" className="submit-btn">Place Order</button>
                    </div>
                </form>
            </div>

            <div className="orders-list">
                <h2>Orders List</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>Order Date</th>
                            <th>User ID</th>
                            <th>Products</th>
                            <th>Total Amount</th>
                            <th>Shipping Address</th>
                            <th>Payment Method</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders && orders.map((order) => (
                            <tr key={order.id}>
                                <td>{order.id}</td>
                                <td>{new Date(order.orderDate).toLocaleString()}</td>
                                <td>{order.userId}</td>
                                <td>
                                    {order.productId && order.productId.map(item => {
                                        const product = products.find(p => p.id === item.productId);
                                        return product ? `${product.name} (${item.quantity})` : item.productId;
                                    }).join(', ')}
                                </td>
                                <td>${order.totalAmount}</td>
                                <td>{order.shippingAddress}</td>
                                <td>{order.paymentMethod}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
