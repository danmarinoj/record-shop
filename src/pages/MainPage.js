import React from 'react';
import Header from '../components/Header';
import Grid from '../components/Grid';

const MainPage = () => (
  <div>
    <Header />
    <div style={{ marginTop: '2em', textAlign: 'center', color: 'white' }}>
      <h1>New Arrivals</h1>
    </div>
    <Grid endpoint="recently-added"/>
  </div>
);

export default MainPage;
