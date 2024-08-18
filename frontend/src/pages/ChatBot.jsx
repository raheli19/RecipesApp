const Chatbox = () => {
    return (
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
    );
  };
  
  export default Chatbox;