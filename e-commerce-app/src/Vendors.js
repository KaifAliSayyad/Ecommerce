import { useEffect, useState } from "react";
import axios from 'axios';

export default function Vendors() {
    const [vendor, setVendor] = useState({
        id: null,
        name: "",
        contact: "",
        location: ""
    });

    const [vendors, setVendors] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8000/vendors").then((response) => {
            setVendors(response.data);
        });
    }, []);

    const handleChange = (e) => {
        setVendor({ ...vendor, [e.target.name]: e.target.value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:8000/vendors", vendor).then((response) => {
            console.log("Vendor added successfully...");
            console.log(response.data);
        });
    }

    const handleDelete = (vendor) => {

        if(window.confirm("Are you sure you want to delete this vendor?")){
            axios.delete(`http://localhost:8000/vendors/${vendor.id}`).then((response) => {
                console.log("Vendor deleted successfully...");
                console.log(response.data);
            });
        }
    }
    
    const handleUpdate = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:8000/vendors/${vendor.id}`, vendor).then((response) => {
            console.log("Vendor updated successfully...");
            console.log(response.data);
        });
    }

    const setData = (vendor) => {
        setVendor(vendor);
    }

    return (
        <div className="products-container">
            <div className="add-product">
                <form onSubmit={(e) => { handleSubmit(e) }}>
                    <input type="text" name="id" onChange={handleChange} value={vendor.id} placeholder="Enter Vendor Id" />
                    <input type="text" name="name" onChange={handleChange} value={vendor.name} placeholder="Enter Vendor Name" />
                    <input type="text" name="contact" onChange={handleChange} value={vendor.contact} placeholder="Enter Vendor Contact" />
                    <input type="text" name="location" onChange={handleChange} value={vendor.location} placeholder="Enter Phone Location" />

                    <div className="button-group">
                        <button type="submit">Add Product</button>
                        <button type="button" onClick={handleUpdate}>Update Product</button>
                        <button type="reset" onClick={() => setVendor({
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
                            <th>Name</th>
                            <th>Contact</th>
                            <th>Location</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {vendors.map((vendor) => {
                            return (
                                <tr key={vendor.id}>
                                    <td>{vendor.id}</td>
                                    <td>{vendor.name}</td>
                                    <td>{vendor.contact}</td>
                                    <td>{vendor.location}</td>
                                    <td> 
                                        <button onClick={() => setData(vendor)}>Update</button>
                                        <button onClick={() => handleDelete(vendor)}>Delete</button>
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