import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/NewPost.css";

function NewPost({ user }) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const navigate = useNavigate();

  const handleAddPost = () => {
    const newPost = {
      userId: user.id,
      id: `${Date.now()}`,
      title: title,
      body: body
    };

    fetch("http://localhost:3000/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPost),
    })
      .then((response) => response.json())
      .then((data) => {
        const updatedPosts = [...JSON.parse(localStorage.getItem("posts")), data]
        localStorage.setItem("posts", JSON.stringify(updatedPosts));
        navigate(`/Posts/${user.id}#bottom`);
      })
      .catch((error) => {
        console.error("Error adding post:", error);
      });
  };

  return (
    <div className="new-post-container">
      <h1>Add New Post</h1>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="title-input"
      />
      <textarea
        placeholder="Body"
        value={body}
        onChange={(e) => setBody(e.target.value)}
        className="body-input"
      />
      <button onClick={handleAddPost} className="add-post-button">Add Post</button>
    </div>
  );
}

export default NewPost;
