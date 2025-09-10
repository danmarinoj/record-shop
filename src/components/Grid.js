import React from 'react';

const defaultImage = "https://via.placeholder.com/150";
const items = Array.from({ length: 9 }).map((_, i) => ({
  artist: "Artist " + (i + 1),
  album: "Album " + (i + 1),
  year: 2000 + i,
  price: "$" + (10 + i),
  image: defaultImage
}));

function Grid() {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '2em',
      padding: '2em'
    }}>
      {items.map((item, idx) => (
        <div key={idx} style={{
          border: '1px solid #ccc',
          borderRadius: '8px',
          padding: '1em',
          textAlign: 'center'
        }}>
          <img src={item.image} alt="album" style={{ width: '100%', borderRadius: '4px' }} />
          <div style={{ marginTop: '1em' }}>
            <div><b>Artist:</b> {item.artist}</div>
            <div><b>Album:</b> {item.album}</div>
            <div><b>Year:</b> {item.year}</div>
            <div><b>Price:</b> {item.price}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Grid;
