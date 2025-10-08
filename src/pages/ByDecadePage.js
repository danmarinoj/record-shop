import React from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import Grid from '../components/Grid';

const ByDecadePage = () => {
  const { decade } = useParams();
  const endpoint = `by-decade?decade=${decade}`;
  return (
    <div>
      <Header />
      <div style={{ marginTop: '2em', textAlign: 'center', color: 'white' }}>
	<h1>{ decade }</h1>
      </div>
      <Grid endpoint={ endpoint }/>
    </div>
  )
};

export default ByDecadePage;
