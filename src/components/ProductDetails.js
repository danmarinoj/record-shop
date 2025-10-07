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

  return (
    <div style={{ marginTop: '2em', textAlign: 'center', color: 'white' }}>
      <h1>{data.name}</h1>
      <div class="row">
	<div class="column">
	  <div style={{
	       border: '1px solid #ccc',
	       borderRadius: '8px',
	       padding: '1em',
	       textAlign: 'Left',
	       backgroundColor: 'black'
               }}>
	    <p>
	      by {data.artist}
	    </p>
	    <p>
	      {data.year}
	    </p>
	    <p>
	      ${data.price}
	    </p>

	    <h2>Notes</h2>
	    <p>
	      Omnis aperiam placeat consequatur. Inventore et et blanditiis aut et. Odio soluta deleniti aut sunt molestiae. Necessitatibus eum architecto qui. In veniam quibusdam sed cum fugit repudiandae dolor
	    </p>

	    <h2>Tracks</h2>
	    
	  <table>
	    <tbody>
              {tracks.map((track, idx) => (
		<tr key={idx}>
		  <td>
		    <div style={{marginRight: '1em'}} >{track.track_number}</div>
		  </td>
		  <td>{track.track_name}</td>
		</tr>
              ))}
	    </tbody>
	  </table>
	  </div>
	</div>
	<div class="column">
	  <img src={image} alt="album" style={{ width: '50%', borderRadius: '4px' }} />
	</div>
      </div>
    </div>
  )
}

export default ProductDetails;
