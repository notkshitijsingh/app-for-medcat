import React, { useState } from 'react';

const YourComponent = () => {
  const [image, setImage] = useState(null);
  const [apiResponse, setApiResponse] = useState('');

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!image) return;

    const formData = new FormData();
    formData.append('image', image);

    try {
      const response = await fetch("https://eoi4zds3zvye1l6.m.pipedream.net", {
        method: 'POST',
        body: formData
      });
      
      const data = await response.json(); // Parse JSON response
      setApiResponse(data.message); // Set the message to state
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="file" accept="image/*" onChange={handleImageChange} />
        <button type="submit">Submit</button>
      </form>

      {apiResponse && (
        <div>
          <h2>API Response:</h2>
          <p>{apiResponse}</p>
        </div>
      )}
    </div>
  );
};

export default YourComponent;
