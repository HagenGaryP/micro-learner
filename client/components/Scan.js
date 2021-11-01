import React, { useState, useEffect } from 'react'
import QrReader from 'react-qr-reader'
import history from '../history';

const Scan = () => {
  const [state, setState] = useState({
    result: 'No result'
  });

  const handleScan = data => {
    if (data) {
      setState({
        result: data
      })
      history.push(`/scanSuccess/`)
    }
  }
  const handleError = err => {
    console.error(err)
  }
  return (
    <div>
      <QrReader
        delay={300}
        onError={handleError}
        onScan={handleScan}
        style={{ width: '80%', height: '50%', margin: '100px' }}
      />
      <p>{state.result}</p>
    </div>
  )
}

export default Scan;
