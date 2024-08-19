import React from "react";
import Chatbox from "./ChatBot";

const Help = () => {
  return (
    <div style={styles.container}>
      <iframe
        src="https://www.youtube.com/embed/Wpfwu__PF7Y?si=blmF4yUVVVDYA6LZ"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerpolicy="strict-origin-when-cross-origin"
        allowfullscreen
        style={styles.iframe}
      ></iframe>
      <Chatbox />
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  },
  iframe: {
    border: "none",
    width: "80%",
    height: "80%",
  },
};

export default Help;
