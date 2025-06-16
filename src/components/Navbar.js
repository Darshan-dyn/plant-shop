// src/components/Navbar.js
import React from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import './Navbar.css';

function Navbar({ cartCount }) {
    return (
        <nav className="navbar">
            <h3>GreenLeaf</h3>
            <div className="cart-icon">
                <FaShoppingCart />
                <span className="cart-count">{cartCount}</span>
            </div>
        </nav>
    );
}

export default Navbar;
