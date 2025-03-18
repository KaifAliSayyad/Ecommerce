import React, { useState } from 'react';
import './App.css';
import Products from './Products';
import Vendors from './Vendors';
import Inventory from './Inventory';
import Orders from './Orders';
import Stock from './Stock';

function App() {

  const [selectedComponent, setSelectedComponent] = useState('products');

  return (
    <div className="App">
        <div className="navbar">
            <div 
              onClick={() => setSelectedComponent('products')} 
              style={{ backgroundColor: selectedComponent === 'products' ? '#e0e0e0' : 'transparent' }}
            >
              Products
            </div>
            <div onClick={() => setSelectedComponent('vendors')}
              style={{ backgroundColor: selectedComponent === 'vendors' ? '#e0e0e0' : 'transparent' }}  
            >Vendors</div>
            <div onClick={() => setSelectedComponent('inventory')}
              style={{ backgroundColor: selectedComponent === 'inventory' ? '#e0e0e0' : 'transparent' }}  
            >Inventory</div>
            <div onClick={() => setSelectedComponent('orders')}
              style={{ backgroundColor: selectedComponent === 'orders' ? '#e0e0e0' : 'transparent' }}  
            >Orders</div>
            <div onClick={() => setSelectedComponent('stock')}
              style={{ backgroundColor: selectedComponent === 'stock' ? '#e0e0e0' : 'transparent' }}  
            >Stock</div>
        </div>
        <div className="content">
          {selectedComponent === 'products' && <Products />}
          {selectedComponent === 'vendors' && <Vendors />}
          {selectedComponent === 'inventory' && <Inventory />}  
          {selectedComponent === 'orders' && <Orders />}  
          {selectedComponent === 'stock' && <Stock />}
        </div>
    </div>
  );
}

export default App;
