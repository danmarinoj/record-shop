import React, { useEffect, useState } from "react";
import axios from "axios";

function ProductDetails({ product_no }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Make GET request to fetch data
    axios
      .get(`http://127.0.0.1:3001/album-details?product_no=${product_no}`)
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);
  const image = `https://ddrecords.s3.us-east-1.amazonaws.com/albumcovers/${product_no}.jpg`;
  const tracks = data?.tracks || [];
  console.log(tracks);
  return (
    <div style={{ marginTop: '2em', textAlign: 'center', color: 'white' }}>
      <h1>{data.name}</h1>
      <h2>by {data.artist}</h2>
      <h2>{data.year}</h2>
      <h2>${data.price}</h2>
      <div class="row">
	<div class="column">
	  <table>
	    <tbody>
              {tracks.map((track, idx) => (
		<tr key={idx}>
		  <td>{track.track_number}</td>
		  <td>{track.track_name}</td>
		</tr>
              ))}
	    </tbody>
	  </table>
	</div>
	<div class="column">
	  <img src={image} alt="album" style={{ width: '50%', borderRadius: '4px' }} />
	</div>
      </div>
    </div>
  )
}

export default ProductDetails;
