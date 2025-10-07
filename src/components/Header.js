import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { Squash as Hamburger } from "hamburger-react";
import axios from "axios";

function Header() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [hamburgerIsOpen, setHamburgerIsOpen] = useState(false);
  const [genreHover, setGenreHover] = useState(false);
  const [decadeHover, setDecadeHover] = useState(false);

  useEffect(() => {
    // Make GET request to fetch data
    axios
      .get("http://127.0.0.1:3001/genres-decades")
      .then((response) => {
        setData(response.data);
        setLoading(true);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);
  
  return (
    <header style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '1em',
      background: '#222',
      color: '#fff'
	    }}>
      {/* left side */}
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {/* Hamburger menu */}
	<div style={{ position: 'relative' }}>
	  <Hamburger toggled={hamburgerIsOpen} toggle={setHamburgerIsOpen} />
	  {hamburgerIsOpen && (
            <div
              style={{
		display: 'flex',
		flexDirection: 'column',
		position: 'absolute',
		top: '40px',
		left: '0',
		background: '#fff',
		border: '1px solid #ddd',
		borderRadius: '6px',
		boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
		padding: '12px',
		zIndex: 1,
              }}
            >

          <div
            style={{ position: 'relative' }}
            onMouseEnter={() => setGenreHover(true)}
            onMouseLeave={() => setGenreHover(false)}
          >
            <button>
              By genre
            </button>
            {genreHover && (
              <div
                style={{
                  position: 'absolute',
                  left: '100%',
                  top: '0',
                  background: '#f9f9f9',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                  padding: '8px',
                  minWidth: '120px',
                  zIndex: 2,
                }}
              >
		{data.genres.map((item, idx) => (
		  <Link to={ "/genres/Rock" }>
		    <button key={ idx } style={{ display: 'block', width: '100%', marginBottom: '4px' }}>{ item }</button>
		  </Link>
		))}
              </div>
            )}
	  </div>



          <div
	      style={{ position: 'relative' }}
              onMouseEnter={() => setDecadeHover(true)}
              onMouseLeave={() => setDecadeHover(false)}
	  >
              <button>
		By decade
              </button>
	      {decadeHover && (
              <div
                style={{
                  position: 'absolute',
                  left: '100%',
                  top: '0',
                  background: '#f9f9f9',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                  padding: '8px',
                  minWidth: '120px',
                  zIndex: 2,
                }}
              >
		{data.decades.map((item, idx) => (
		  <Link to="/decades/1970">
		    <button key={idx } style={{ display: 'block', width: '100%', marginBottom: '4px' }}>{item}</button>
		  </Link>
		))}
              </div>
            )}
          </div>


	    </div>
	      )}
	    </div>
	  {/* End hamburger */}

	<Link to='/'>
          <button style={{
            background: '#444',
            color: '#fff',
	    border: 'none',
            padding: '0.5em 1em',
            borderRadius: '4px',
            cursor: 'pointer'
	  }}>
          Home
          </button>
        </Link>
	</div>
	{/* end left side */}

	
      {/* Brand */}
	<div style={{ fontFamily: 'EvilEmpire', fontWeight: 'bold', fontSize: '1.7em' }}>
	  Double D's Record Paradise
	</div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {/* Search bar */}
        <input
          type="text"
          placeholder="Search..."
          style={{
            padding: '0.5em',
            borderRadius: '4px',
            border: '1px solid #ccc',
            marginRight: '1em'
          }}
        />
        {/* Shopping cart */}
        <a href="#" style={{
          color: '#fff',
          textDecoration: 'none',
          fontSize: '1.5em'
        }}>
          &#128722;
        </a>
      </div>

    </header>
  );
}

export default Header;
