import React from 'react';
import { useParams } from 'react-router-dom';
import VastraSevaHeader from './VastraSevaHeader';
import Footer from './Footer';

const Diety = () => {
  const params=useParams();
  return (
    <div>
      <VastraSevaHeader/>
      <h1>{params.diety_name}</h1>
      {/* <Footer/> */}
      
    </div>
  );
  
};

export default Diety;
