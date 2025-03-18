import { useEffect, useState } from "react";
import axios from 'axios';
import "./Products.css";

export default function Stock() {
    const [stock, setStock] = useState({
        id: null,
        productId: null,
        quantity:null
    });

    const [stocks, setStocks] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8000/stock").then((response) => {
            setStocks(response.data);
        });
    }, []);

    const handleChange = (e) => {
        setStock({ ...stock, [e.target.name]: e.target.value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:8000/stock", stock).then((response) => {
            console.log("Stock added successfully...");
            console.log(response.data);
        });
    }

    const handleDelete = (stock) => {
        if(window.confirm("Are you sure you want to delete this stock?")) {
            axios.delete(`http://localhost:8000/stock/${stock.id}`).then((response) => {
                console.log("Stock deleted successfully...");
                console.log(response.data);
            });
        }
    }

    const handleUpdate = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:8000/stock/${stock.id}`, stock).then((response) => {
            console.log("Stock updated successfully...");
            console.log(response.data);
        });
    }

    const setData = (stock) => {
        setStock(stock);
    }

    return (
        <div className="products-container">
            <div className="add-product">
                <form onSubmit={(e) => { handleSubmit(e) }}>
                    <input type="text" name="id" onChange={handleChange} value={stock.id} placeholder="Enter Stock Id" />
                    <input type="number" name="productId" onChange={handleChange} value={stock.productId} placeholder="Enter Product Id" />
                    <input type="number" name="quantity" onChange={handleChange} value={stock.quantity} placeholder="Enter Quantity" />

                    <div className="button-group">
                        <button type="submit">Add Product</button>
                        <button type="button" onClick={handleUpdate}>Update Product</button>
                        <button type="reset" onClick={() => setStock({
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
                            <th>Quantity</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {stocks.map((stock) => {
                            return (
                                <tr key={stock.id}>
                                    <td>{stock.id}</td>
                                    <td>{stock.productId}</td>
                                    <td>{stock.quantity}</td>
                                    <td><button onClick={() => setData(stock)}>Update</button></td>
                                    <td><button onClick={() => handleDelete(stock)}>Delete</button></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
