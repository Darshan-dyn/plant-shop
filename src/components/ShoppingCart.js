import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './ShoppingCart.css'; // Make sure your styles are imported

function ShoppingCart({ cartItems, setCartItems }) {
    const navigate = useNavigate();
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        address: '',
        pincode: '',
        phone: '',
    });
    const [paymentMode, setPaymentMode] = useState('');
    const [selectedApp, setSelectedApp] = useState('');
    const [errors, setErrors] = useState({});

    const itemMap = {};
    cartItems.forEach((item) => {
        const numericPrice = parseFloat(item.price);
        if (itemMap[item.id]) {
            itemMap[item.id].quantity += 1;
        } else {
            itemMap[item.id] = { ...item, quantity: 1, price: numericPrice };
        }
    });

    const groupedItems = Object.values(itemMap);

    const handleIncrease = (item) => {
        setCartItems((prev) => [...prev, item]);
    };

    const handleDecrease = (item) => {
        const index = cartItems.findIndex((i) => i.id === item.id);
        if (index !== -1) {
            const updated = [...cartItems];
            updated.splice(index, 1);
            setCartItems(updated);
        }
    };

    const handleRemove = (item) => {
        setCartItems((prev) => prev.filter((i) => i.id !== item.id));
    };

    const total = groupedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const validateForm = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = 'Name is required';
        if (!formData.address.trim()) newErrors.address = 'Address is required';
        if (!formData.pincode.trim()) newErrors.pincode = 'Pincode is required';
        if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
        if (!paymentMode) newErrors.paymentMode = 'Select a payment option';
        if (paymentMode === 'online' && !selectedApp) newErrors.selectedApp = 'Select a UPI method';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleFormSubmit = () => {
        if (!validateForm()) return;

        if (paymentMode === 'cod') {
            alert("Order placed with Cash on Delivery ✅");
        } else {
            alert(`Redirecting to ${selectedApp} for payment...`);
        }

        setCartItems([]);
        localStorage.removeItem('cart');
        navigate('/confirmation');
    };

    return (
        <div className="shopping-cart">
            <h2>Shopping Cart</h2>
            {groupedItems.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <>
                    <ul>
                        {groupedItems.map((item) => (
                            <li key={item.id}>
                                <div>
                                    <strong>{item.name}</strong><br />
                                    ₹{item.price} × {item.quantity}
                                    <div style={{ marginTop: '5px' }}>
                                        <button onClick={() => handleDecrease(item)} style={{ marginRight: '5px' }}>−</button>
                                        <button onClick={() => handleIncrease(item)}>+</button>
                                        <button onClick={() => handleRemove(item)} style={{ marginLeft: '10px' }}>Remove</button>
                                    </div>
                                </div>
                                <div>₹{(item.price * item.quantity).toFixed(2)}</div>
                            </li>
                        ))}
                    </ul>
                    <h3>Total: ₹{total.toFixed(2)}</h3>

                    {!showForm && (
                        <button
                            onClick={() => setShowForm(true)}
                            style={{
                                marginTop: '20px',
                                padding: '10px 20px',
                                backgroundColor: '#4CAF50',
                                color: 'white',
                                border: 'none',
                                fontSize: '16px',
                                cursor: 'pointer'
                            }}
                        >
                            Buy
                        </button>
                    )}

                    {showForm && (
                        <div style={{ marginTop: '20px' }}>
                            <h2>Enter Delivery Details</h2>
                            <input
                                placeholder="Name*"
                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                            />
                            {errors.name && <div style={{ color: 'red' }}>{errors.name}</div>}
                            <input
                                placeholder="Address*"
                                onChange={e => setFormData({ ...formData, address: e.target.value })}
                            />
                            {errors.address && <div style={{ color: 'red' }}>{errors.address}</div>}
                            <input
                                placeholder="Pincode*"
                                onChange={e => setFormData({ ...formData, pincode: e.target.value })}
                            />
                            {errors.pincode && <div style={{ color: 'red' }}>{errors.pincode}</div>}
                            <input
                                placeholder="Phone Number*"
                                onChange={e => setFormData({ ...formData, phone: e.target.value })}
                            />
                            {errors.phone && <div style={{ color: 'red' }}>{errors.phone}</div>}

                            <h4>Select Payment Option</h4>
                            <div className="payment-options">
                                <label>
                                    <input
                                        type="radio"
                                        value="cod"
                                        checked={paymentMode === 'cod'}
                                        onChange={() => setPaymentMode('cod')}
                                    /> Cash on Delivery
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        value="online"
                                        checked={paymentMode === 'online'}
                                        onChange={() => setPaymentMode('online')}
                                    /> Online Payment
                                </label>
                            </div>
                            {errors.paymentMode && <div style={{ color: 'red' }}>{errors.paymentMode}</div>}

                            {paymentMode === 'online' && (
                                <div className="upi-methods">
                                    <p>Select UPI Method:</p>
                                    {['Google Pay', 'PhonePe', 'BHIM', 'Paytm'].map((app) => (
                                        <label key={app}>
                                            <input
                                                type="radio"
                                                name="upi"
                                                value={app}
                                                checked={selectedApp === app}
                                                onChange={(e) => setSelectedApp(e.target.value)}
                                            /> {app}
                                        </label>
                                    ))}
                                    {errors.selectedApp && <div style={{ color: 'red' }}>{errors.selectedApp}</div>}
                                </div>
                            )}

                            <button
                                onClick={handleFormSubmit}
                                style={{
                                    padding: '10px 20px',
                                    backgroundColor: '#2196F3',
                                    color: 'white',
                                    border: 'none',
                                    fontSize: '16px',
                                    marginTop: '10px',
                                    cursor: 'pointer'
                                }}
                            >
                                Submit
                            </button>
                        </div>
                    )}

                    {/* ✅ Centered Continue Shopping Button */}
                    <div className="continue-shopping">
                        <Link to="/products" style={{ textDecoration: 'none' }}>
                            <button style={{
                                padding: '10px 20px',
                                backgroundColor: '#FF9800',
                                color: 'white',
                                border: 'none',
                                borderRadius: '4px',
                                fontSize: '16px',
                                cursor: 'pointer'
                            }}>
                                Continue Shopping
                            </button>
                        </Link>
                    </div>
                </>
            )}
        </div>
    );
}

export default ShoppingCart;
