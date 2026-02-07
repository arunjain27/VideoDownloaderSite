import React from 'react';
import { useParams } from 'react-router-dom';
import Home from './Home';

const PlatformPage = () => {
  const { platform } = useParams();
  
  return (
    <div>
      <Home />
    </div>
  );
};

export default PlatformPage;
