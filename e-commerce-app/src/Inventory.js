import { useEffect, useState } from "react";
import axios from 'axios';
import "./Products.css";

export default function Inventory() {
    const [inventory, setInventory] = useState({
        id: null,
        productId: null,
        stock: null
    });

    const [inventories, setInventories] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8000/inventory").then((response) => {
            setInventories(response.data);
        });
    }, []);

    const handleChange = (e) => {
        setInventory({ ...inventory, [e.target.name]: e.target.value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:8000/inventory", inventory).then((response) => {
            console.log("Inventory added successfully...");
            console.log(response.data);
        });
    }

    const handleDelete = (inventory) => {
        if(window.confirm("Are you sure you want to delete this inventory?")) {
            axios.delete(`http://localhost:8000/inventory/${inventory.id}`).then((response) => {
                console.log("Inventory deleted successfully...");
                console.log(response.data);
            });
        }
    }

    const handleUpdate = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:8000/inventory/${inventory.id}`, inventory).then((response) => {
            console.log("Inventory updated successfully...");
            console.log(response.data);
        });
    }

    const setData = (inventory) => {
        setInventory(inventory);
    }

    return (
        <div className="products-container">
            <div className="add-product">
                <form onSubmit={(e) => { handleSubmit(e) }}>
                    <input type="text" name="id" onChange={handleChange} value={inventory.id} placeholder="Enter Inventory Id" />
                    <input type="number" name="productId" onChange={handleChange} value={inventory.productId} placeholder="Enter Product Id" />
                    <input type="number" name="stock" onChange={handleChange} value={inventory.stock} placeholder="Enter Stock" />

                    <div className="button-group">
                        <button type="submit">Add Product</button>
                        <button type="button" onClick={handleUpdate}>Update Product</button>
                        <button type="reset" onClick={() => setInventory({
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
            <hr></hr>
            <div className="products">
                <table border="1">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Product Id</th>
                            <th>Stock</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {inventories.map((inventory) => {
                            return (
                                <tr key={inventory.id}>
                                    <td>{inventory.id}</td>
                                    <td>{inventory.productId}</td>
                                    <td>{inventory.stock}</td>
                                    <td><button onClick={() => setData(inventory)}>Update</button></td>
                                    <td><button onClick={() => handleDelete(inventory)}>Delete</button></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}