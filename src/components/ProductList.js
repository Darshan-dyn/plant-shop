// src/components/ProductList.js
import React, { useState } from 'react';
import './ProductList.css';

import aloeVeraImg from '../assets/alovera.jpg';
import snakePlantImg from '../assets/snakeplant.jpg';
import peaceLilyImg from '../assets/peacelily.jpg';
import fiddleLeafImg from '../assets/fiddleleaf.jpg';
import cactusMiniImg from '../assets/cactusmini.jpg';
import orchidImg from '../assets/orchid.jpg';

// Define products with local image imports
const products = [
    { id: 1, name: 'Aloe Vera', price: 199, image: aloeVeraImg, category: 'Succulent' },
    { id: 2, name: 'Snake Plant', price: 249, image: snakePlantImg, category: 'Indoor' },
    { id: 3, name: 'Peace Lily', price: 299, image: peaceLilyImg, category: 'Flowering' },
    { id: 4, name: 'Fiddle Leaf Fig', price: 399, image: fiddleLeafImg, category: 'Indoor' },
    { id: 5, name: 'Cactus Mini', price: 149, image: cactusMiniImg, category: 'Succulent' },
    { id: 6, name: 'Orchid', price: 349, image: orchidImg, category: 'Flowering' },
];

const ProductList = ({ onAddToCart }) => {
    const [addedItems, setAddedItems] = useState([]);

    const handleAddToCart = (plant) => {
        setAddedItems([...addedItems, plant.id]);
        onAddToCart(plant); // Pass item to parent
    };

    const categories = [...new Set(products.map((p) => p.category))];

    return (
        <div className="product-list">
            <h2>Our Plants</h2>
            {categories.map((cat) => (
                <div key={cat}>
                    <h3>{cat}</h3>
                    <div className="product-grid">
                        {products
                            .filter((p) => p.category === cat)
                            .map((plant) => (
                                <div key={plant.id} className="product-card">
                                    <img src={plant.image} alt={plant.name} />
                                    <h4>{plant.name}</h4>
                                    <p>₹{plant.price}</p>
                                    <button
                                        onClick={() => handleAddToCart(plant)}
                                        disabled={addedItems.includes(plant.id)}
                                    >
                                        {addedItems.includes(plant.id) ? 'Added' : 'Add to Cart'}
                                    </button>
                                </div>
                            ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ProductList;
