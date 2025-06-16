import React from 'react';
import './LandingPage.css';

function LandingPage() {
    return (
        <div className="landing-hero">
            <div className="landing-overlay">
                <h1>About Us</h1>
                <h2>Welcome To Greenlife Farm</h2>
                <p>
                    Your go-to shop for fresh, vibrant, and eco-friendly houseplants. We help bring nature indoors!<br />
                    Discover beautiful plants for every space, handpicked to thrive.<br />
                    Bring serenity and greenery to your home with just a few clicks.
                </p>
                <a href="/products" className="get-started-button">Get Started</a>
            </div>
        </div>
    );
}

export default LandingPage;
