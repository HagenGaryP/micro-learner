import React, { useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export const LandingPage = () => {

  return (
    <div className="home-page-container">
      <div className="content-container">
          {/* <div className="front-page-welcome"> */}
          <div className="front-display-text">
            <h1 className="primary-header">GMG</h1>
            <div className="front-page-buttons">
              <Link to="/scan">
                <Button variant="outline-dark">
                  <h2>Scan Code</h2>
                </Button>
              </Link>
            </div>
          </div>

      </div>
      {/* </div> */}
    </div>
  );
};
