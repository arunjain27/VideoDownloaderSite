import React from 'react';
import './Legal.css';

const Disclaimer = () => {
  return (
    <div className="legal-page">
      <div className="container">
        <h1>Disclaimer</h1>
        <div className="legal-content">
          <p>This service is provided for educational and personal use only.</p>
          <h2>Copyright Notice</h2>
          <p>Users are responsible for ensuring they have the right to download content. We do not store videos on our servers.</p>
          <h2>Fair Use</h2>
          <p>Please respect copyright laws and terms of service of the platforms you download from.</p>
        </div>
      </div>
    </div>
  );
};

export default Disclaimer;
