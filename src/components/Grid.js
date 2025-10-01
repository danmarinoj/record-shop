import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
      .get("http://127.0.0.1:3001/recently-added")
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // set image for each item
  data.forEach((item, index) => {
    item.image = `https://ddrecords.s3.us-east-1.amazonaws.com/albumcovers/${item.product_no}.jpg`;
    item.link = `/product/${item.product_no}`;
  });    
    
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '2em',
      padding: '2em'
    }}>
      {data.map((item, idx) => (
        <div key={idx} style={{
	       border: '1px solid #ccc',
	       borderRadius: '8px',
	       padding: '1em',
	       textAlign: 'center',
	       backgroundColor: 'white'
             }}>
	  <Link to={item.link}>
            <img src={item.image} alt="album" style={{ width: '100%', borderRadius: '4px' }} />
	  </Link>
          <div style={{ marginTop: '1em' }}>
            <div>{item.name}</div>
            <div>by {item.artist}</div>
            <div>{item.year}</div>
            <div>${item.price}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Grid;
