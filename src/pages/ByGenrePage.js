import React from 'react';
import Header from '../components/Header';
import Grid from '../components/Grid';

const ByGenrePage = ({ genre }) => (
  <div>
    <Header />
    <div style={{ marginTop: '2em', textAlign: 'center', color: 'white' }}>
      <h1>{ genre }</h1>
    </div>
    <Grid endpoint="by-genre?genre=Rock"/>
  </div>
);

export default ByGenrePage;
