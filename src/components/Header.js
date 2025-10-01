import React from 'react';
import { Link } from "react-router-dom";

function Header() {
  return (
    <header style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '1em',
      background: '#222',
      color: '#fff'
    }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {/* Hamburger menu */}
        <button style={{
          background: 'none',
          border: 'none',
          color: '#fff',
          fontSize: '1.5em',
          marginRight: '1em',
          cursor: 'pointer'
        }}>
          &#9776;
        </button>
        {/* Home button */}
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
