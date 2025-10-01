import React from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import ProductDetails from '../components/ProductDetails';

const ProductDetailsPage = () => {
  const { product_no } = useParams();
  return (
    <div>
      <Header />
      <ProductDetails product_no={product_no}/>
    </div>
  )
};

export default ProductDetailsPage;
