import React, { useState, useRef } from 'react';
import { toPng } from 'html-to-image';
import './App.css';

// Business card component to display the user's information
const BusinessCard = ({ name, title, email, phone, imageUrl, cardRef }) => (
  <div className="card" ref={cardRef}>
    <div className="image-holder">
      {imageUrl ? <img src={imageUrl} alt="Profile" /> : <span>Upload Image</span>}
    </div>
    <div className="card-details">
      <h2>{name || 'Your Name'}</h2>
      <h4>{title || 'Your Title'}</h4>
      <p>{email || 'your.email@example.com'}</p>
      <p>{phone || '123-456-7890'}</p>
    </div>
  </div>
);

// Main app component
const App = () => {
  // State variables for storing input values
  const [name, setName] = useState('');
  const [title, setTitle] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  // Reference for the business card element
  const cardRef = useRef(null);

  // Handle image upload and set the image URL
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  // Function to download the card as an image
  const downloadCardAsImage = () => {
    if (cardRef.current) {
      toPng(cardRef.current, { backgroundColor: 'black' }) // Use transparent background for capturing
        .then((dataUrl) => {
          const link = document.createElement('a');
          link.href = dataUrl;
          link.download = 'business-card.png';
          link.click();
        })
        .catch((err) => {
          console.error('Failed to generate image:', err);
        });
    }
  };
  

  return (
    <div className="app-container">
      <h1>Business Card Generator</h1>
      <form className="form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />
        <button type="submit">Generate Card</button>
      </form>
      <BusinessCard
        name={name}
        title={title}
        email={email}
        phone={phone}
        imageUrl={imageUrl}
        cardRef={cardRef}
      />
      <button className="download-button" onClick={downloadCardAsImage}>Download Card as Image</button>
      <h5>Business Card Generator is created by Abdul Hassan Mohsini</h5>
    </div>
  );
};

export default App;
