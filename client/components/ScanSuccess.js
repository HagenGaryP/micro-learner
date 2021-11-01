import React, { useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function ScanSuccess(props) {
  console.log("result -->  ", props.data)
  useEffect(() => {
    // props.handleSuccessfulScan()
  }, [])

  return (
    <div>
      Scanned!  the result is { props.data }

      <div>
      <Link to="/scan">
        <Button onClick={() => props.handleSuccessfulScan()} variant="outline-dark">
          <h2>Scan Again</h2>
        </Button>
      </Link>
      </div>
    </div>
  );
}

export default ScanSuccess;
