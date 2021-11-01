import React, { useState, useEffect } from 'react'
import QrReader from 'react-qr-reader'
import history from '../history';
import { connect } from 'react-redux';
import { ScanSuccess } from '.';

const Scan = () => {
  const [state, setState] = useState({
    result: 'No result'
  });
  const [scanned, setScanned] = useState(false);

  // useEffect(() => {
  //   fetchProduct(match.params.id)
  // }, [])

  const handleScan = data => {
    if (data) {
      setState({
        result: data
      })
      setScanned(true);
      // history.push(`/scanSuccess/`)
    }
  }



  const handleSuccessfulScan = () => {
    setState({
      result: 'No result'
    })
    setScanned(false);
  }

  const handleError = err => {
    console.error(err)
  }
  return (
    <div className='scan-container'>
      {!scanned && state.result == 'No result' ?
        <div className="scan-view">
          <QrReader
            delay={10}
            onError={handleError}
            onScan={handleScan}
            // style={{ width: '80%', height: '50%', margin: '100px' }}
          />
          <p>{state.result}</p>
        </div>
        :
        <ScanSuccess data={state.result} handleSuccessfulScan={handleSuccessfulScan} />

      }
    </div>
  )
}

export default Scan;

// const mapState = (state) => {
//   console.log('state ===> ', state)
//   return {
//     product: state.singleProduct,
//   }
// }
// const mapDispatch = (dispatch) => {
//   return {
//     fetchProduct: (productId) => dispatch(fetchSingleProduct(productId)),
//   }
// }

// export default connect(mapState, mapDispatch)(Scan);
