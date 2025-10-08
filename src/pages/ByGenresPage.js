import React from 'react';
import Header from '../components/Header';
import Grid from '../components/Grid';

const ByGenrePage = () => {
  const { genre } = useParams();
  const endpoint = `by-genre?genre=${genre}`;
  return (
    <div>
      <Header />
      <div style={{ marginTop: '2em', textAlign: 'center', color: 'white' }}>
	<h1>{ Genre }</h1>
      </div>
      <Grid endpoint={ endpoint }/>
    </div>
  )
};

export default ByGenrePage;
