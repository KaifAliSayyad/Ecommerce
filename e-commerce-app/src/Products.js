import { useEffect, useState } from "react";
import axios from 'axios';
import './Products.css';

export default function Products() {

    const [product, setProduct] = useState({
        id: null,
        name: "",
        description: "",
        price: null,
        vendorId: null,
        inventoryId: null
    });

    const [products, setProducts] = useState([]);
    const [vendors, setVendors] = useState([]);
    const [inventories, setInventories] = useState([]);

    useEffect(() => {
        // Fetch products
        axios.get("http://localhost:8000/products").then((response) => {
            setProducts(response.data);
        });

        // Fetch vendors
        axios.get("http://localhost:8000/vendors").then((response) => {
            setVendors(response.data);
        });

        // Fetch inventories
        axios.get("http://localhost:8000/inventory").then((response) => {
            setInventories(response.data);
        });
    }, []);

    const handleChange = (e) => {
        const value = e.target.type === 'number' ? 
            (e.target.value === '' ? null : Number(e.target.value)) : 
            e.target.value;
        setProduct({ ...product, [e.target.name]: value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:8000/products", product).then((response) => {
            console.log("Product added successfully...");
            console.log(response.data);
            // Refresh products list
            axios.get("http://localhost:8000/products").then((response) => {
                setProducts(response.data);
            });
            // Reset form
            setProduct({
                id: null,
                name: "",
                description: "",
                price: null,
                vendorId: null,
                inventoryId: null
            });
        });
    }

    const handleDelete = (productToDelete) => {
        if(window.confirm("Are you sure you want to delete this product?")) {
            axios.delete(`http://localhost:8000/products/${productToDelete.id}`).then((response) => {
                console.log("Product deleted successfully...");
                console.log(response.data);
                // Refresh products list
                axios.get("http://localhost:8000/products").then((response) => {
                    setProducts(response.data);
                });
            });
        }
    }

    const handleUpdate = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:8000/products/${product.id}`, product).then((response) => {
            console.log("Product updated successfully...");
            console.log(response.data);
            // Refresh products list
            axios.get("http://localhost:8000/products").then((response) => {
                setProducts(response.data);
            });
        });
    }

    const setData = (product) => {
        setProduct(product);
    }

    return (
        <div className="products-container">
            <div className="add-product">
                <form onSubmit={(e) => { handleSubmit(e) }}>
                    <input 
                        type="text" 
                        name="id" 
                        onChange={handleChange} 
                        value={product.id || ''} 
                        placeholder="Enter Product Id" 
                    />
                    <input 
                        type="text" 
                        name="name" 
                        onChange={handleChange} 
                        value={product.name} 
                        placeholder="Enter Product Name" 
                    />
                    <input 
                        type="text" 
                        name="description" 
                        onChange={handleChange} 
                        value={product.description} 
                        placeholder="Enter Product Description" 
                    />
                    <input 
                        type="number" 
                        name="price" 
                        onChange={handleChange} 
                        value={product.price || ''} 
                        placeholder="Enter Product Price" 
                    />
                    
                    <select 
                        name="vendorId" 
                        onChange={handleChange} 
                        value={product.vendorId || ''} 
                    >
                        <option value="">Select Vendor</option>
                        {vendors.map(vendor => (
                            <option key={vendor.id} value={vendor.id}>
                                {vendor.name} ({vendor.id})
                            </option>
                        ))}
                    </select>

                    <select 
                        name="inventoryId" 
                        onChange={handleChange} 
                        value={product.inventoryId || ''} 
                    >
                        <option value="">Select Inventory</option>
                        {inventories.map(inventory => (
                            <option key={inventory.id} value={inventory.id}>
                                ID: {inventory.id} (Stock: {inventory.stock})
                            </option>
                        ))}
                    </select>

                    <div className="button-group">
                        <button type="submit">Add Product</button>
                        <button type="button" onClick={handleUpdate}>Update Product</button>
                        <button type="reset" onClick={() => setProduct({
                            id: null,
                            name: "",
                            description: "",
                            price: null,
                            vendorId: null,
                            inventoryId: null
                        })}>Reset</button>
                    </div>
                </form>
            </div>
            <hr />
            <div className="products">
                <table>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th style={{ width: "30rem" }}>Description</th>
                            <th>Price</th>
                            <th>Vendor</th>
                            <th>Inventory Stock</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => {
                            const vendor = vendors.find(v => v.id === product.vendorId);
                            const inventory = inventories.find(i => i.id === product.inventoryId);
                            return (
                                <tr key={product.id} >
                                    <td>{product.id}</td>
                                    <td>{product.name}</td>
                                    <td>{product.description}</td>
                                    <td>${product.price}</td>
                                    <td>{vendor ? vendor.name : 'N/A'}</td>
                                    <td>{inventory ? inventory.stock : 'N/A'}</td>
                                    <td>
                                        <button onClick={() => setData(product)}>Update Product</button>
                                        <button onClick={() => handleDelete(product)}>Delete</button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}