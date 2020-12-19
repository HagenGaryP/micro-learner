import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export const LandingPage = () => {
  return (
    <div>
      <div>
        <div className="welcome" />
        <div className="home-page-container">
          <div className="front-page-welcome">
            <div>
              <h1 className="front-display-text">Micro-Learner</h1>
              <div className="front-page-buttons">
                <Link to="/topics">
                  <Button variant="outline-light button-margin">
                    VIEW TOPICS
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
