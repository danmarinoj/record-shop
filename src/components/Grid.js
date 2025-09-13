import React, { useEffect, useState } from "react";
import axios from "axios";

const defaultImage = "https://via.placeholder.com/150";
const items = Array.from({ length: 9 }).map((_, i) => ({
  artist: "Artist " + (i + 1),
  album: "Album " + (i + 1),
  year: 2000 + i,
  price: "$" + (10 + i),
  image: defaultImage
}));

function Grid() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Make GET request to fetch data
    axios
      .get("http://127.0.0.1:3000/recently-added")
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);
    
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '2em',
      padding: '2em'
    }}>
      {data.forEach((item, idx) => (
        <div key={idx} style={{
          border: '1px solid #ccc',
          borderRadius: '8px',
          padding: '1em',
          textAlign: 'center'
        }}>
          <img src="https://via.placeholder.com/150" alt="album" style={{ width: '100%', borderRadius: '4px' }} />
          <div style={{ marginTop: '1em' }}>
            <div><b>Album:</b> {item.name}</div>
            <div><b>Artist:</b> {item.artist}</div>
            <div><b>Year:</b> {item.year}</div>
            <div><b>Price:</b> {item.price}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Grid;
