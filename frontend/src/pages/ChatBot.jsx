import React, { useState } from 'react';

const Chatbox = () => {
  const [visible, setVisible] = useState(true);

  const handleClose = () => {
    setVisible(false);
  };

  return (
    visible && (
      <div
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          zIndex: 1000,
          width: '350px',
          height: '500px',
          border: 'none',
        }}
      >
        <button
          onClick={handleClose}
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            background: 'gray',
            color: 'white',
            border: 'none',
            borderRadius: '50%',
            width: '30px',
            height: '30px',
            cursor: 'pointer',
          }}
        >
          X
        </button>
        <iframe
          src="https://cdn.botpress.cloud/webchat/v2/shareable.html?botId=4fc7bc3c-11a8-47b2-8fc1-246ae6552111"
          style={{
            width: '100%',
            height: '100%',
            border: 'none',
          }}
          title="RecipeBot Chat"
        ></iframe>
      </div>
    )
  );
};

export default Chatbox;