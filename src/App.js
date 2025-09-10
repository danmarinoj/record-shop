import React from 'react';
import Header from './components/Header';
import Grid from './components/Grid';

function App() {
  return (
    <div>
      <Header />
      <div style={{ marginTop: '2em', textAlign: 'center' }}>
        <h2>New Arrivals</h2>
      </div>
      <Grid />
    </div>
  );
}

export default App;
