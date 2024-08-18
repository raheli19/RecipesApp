/*This component allows users to view, search, and add albums.
 It fetches albums from the server based on the user ID, displays them, and provides functionality to add new albums.
 The search functionality filters albums by ID and title.*/ 


import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import "../css/Recipes.css";

function Albums({ user }) {

  //State for storing the list of albums
  const [albums, setAlbums] = useState([]);

  //State for storing the search term used to filter albums
  const [searchTerm, setSearchTerm] = useState('');

  //State for storing the title of a new album being added.
  const [newAlbumTitle, setNewAlbumTitle] = useState('');

  //Extracts userId from the URL parameters
  const { userId } = useParams();

  useEffect(() => {
    fetch(`http://localhost:3006/albums?userId=${userId}`)
      .then((response) => response.json())
      .then((data) => {
        setAlbums(data);
        localStorage.setItem("albums", JSON.stringify(data));
      })
      .catch((error) => {
        console.error("Error fetching albums:", error);
      });
  }, [user]);

  //This function is called when the user clicks the "Add Album" button
  const handleAddAlbum = () => {
    const newAlbum = {
      userId: user.id,
      id: `${Date.now()}`,
      title: newAlbumTitle
    };

    //Makes a POST request to add the new album to the server
    fetch('http://localhost:3006/albums', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newAlbum),
    })
      .then(response => response.json())
      .then(data => {
        const updatedAlbums = [...albums, data];
        setAlbums(updatedAlbums);
        localStorage.setItem("albums", JSON.stringify(updatedAlbums));
        setNewAlbumTitle('');
      })
      .catch(error => {
        console.error('Error adding album:', error);
      });
  };

  //Filters the albums state based on the searchTerm.
 // It checks if the album's ID or title contains the search term.
  const filteredAlbums = albums.filter(album =>
    album.id.toString().includes(searchTerm) || album.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h2>Albums</h2>
      <input
        type="text"
        placeholder="Search albums"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <input
        type="text"
        placeholder="New album title"
        value={newAlbumTitle}
        onChange={(e) => setNewAlbumTitle(e.target.value)}
      />
      <button onClick={handleAddAlbum}>Add Album</button>
      <div className="albums-container">
        {filteredAlbums.map((album) => (
          <Link
            key={album.id}
            to={`/albums/${userId}/id/${album.id}`}
            className="album-link"
          >
            <div className="album">
              <h5 className="album-id">{`Album Id: ${album.id}`}</h5>
              <h6 className="album-title">{album.title}</h6>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Albums;
