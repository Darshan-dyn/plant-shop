// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import ProductList from './components/ProductList';
import ShoppingCart from './components/ShoppingCart';
import ConfirmationPage from './components/ConfirmationPage';
import { FaShoppingCart } from 'react-icons/fa';

function App() {
  const [cart, setCart] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  // Load cart and theme from localStorage
  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) setCart(JSON.parse(storedCart));

    const savedTheme = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedTheme);
  }, []);

  // Persist cart
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // Apply and persist theme
  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  const handleAddToCart = (plant) => {
    setCart(prevCart => {
      const exists = prevCart.find(item => item.id === plant.id);
      return exists
        ? prevCart.map(item => item.id === plant.id
          ? { ...item, quantity: item.quantity + 1 }
          : item)
        : [...prevCart, { ...plant, quantity: 1 }];
    });
  };

  const handleRemoveFromCart = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const handleUpdateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setCart(prev =>
      prev.map(item => item.id === id
        ? { ...item, quantity: newQuantity }
        : item)
    );
  };

  const handleClearCart = () => {
    setCart([]);
    localStorage.removeItem('cart');
  };

  const toggleTheme = () => {
    setDarkMode(prev => !prev);
  };

  return (
    <Router>
      <div className={darkMode ? 'dark' : ''}>
        <nav style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '10px 40px',
          backgroundColor: darkMode ? '#333' : '#4CAF50',
          color: 'white'
        }}>
          {/* Left section: Home | Products | Cart */}
          <div style={{ display: 'flex', gap: '750px', flex: 1 }}>
            <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>Home</Link>
            <Link to="/products" style={{ color: 'white', textDecoration: 'none' }}>Products</Link>
            <Link to="/cart" style={{ color: 'white', textDecoration: 'none' }}>Cart</Link>
          </div>

          {/* Right section: Dark Mode | Cart Icon */}
          <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
            <button onClick={toggleTheme} style={{
              padding: '6px 12px',
              backgroundColor: darkMode ? '#222' : '#fff',
              color: darkMode ? '#fff' : '#333',
              border: '1px solid #ccc',
              cursor: 'pointer',
              borderRadius: '4px'
            }}>
              {darkMode ? '☀ Light Mode' : '🌙 Dark Mode'}
            </button>
            <Link to="/cart" style={{
              fontSize: '20px',
              color: '#FFD700',
              display: 'flex',
              alignItems: 'center',
              textDecoration: 'none'
            }}>
              <FaShoppingCart style={{ marginRight: '5px' }} />
              {cart.reduce((sum, item) => sum + item.quantity, 0)}
            </Link>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/products" element={
            <ProductList onAddToCart={handleAddToCart} cartItems={cart} />
          } />
          <Route path="/cart" element={
            <ShoppingCart
              cartItems={cart}
              setCartItems={setCart}
              onRemove={handleRemoveFromCart}
              onQuantityChange={handleUpdateQuantity}
              onCheckout={handleClearCart}
            />
          } />
          <Route path="/confirmation" element={<ConfirmationPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
