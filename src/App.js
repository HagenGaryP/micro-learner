import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './App.css';
import {API_KEY} from '/server';


function App() {

  const [searchTerm, setSearchTerm] = useState('');



  const handleSubmit = (event) => {
    event.preventDefault();

  }

  const fetchSearch = async () => {
    console.log('API KEY = ', API_KEY);
    let data = '';
    let config = {
      method: 'get',
      url: `https://api.bing.microsoft.com/v7.0/search?q=${searchTerm}`,
      headers: {
        'Ocp-Apim-Subscription-Key': `${API_KEY}`
      },
      data : data
    };
    return axios.get(`https://api.bing.microsoft.com/v7.0/search?q=${searchTerm}`, config)
    .then((response) => {
      // data = response.data.webPages.value
      // console.log(JSON.stringify(response.data));
      // console.log('data = ', response.data.webPages.value[0]);
      console.log(response);
      return response;
    })
    .catch((error) => {
      console.log(error);
    });
  }

  const fetchData = async () => {
    return axios.get('https://randomuser.me/api')
    .then((response) => {
      // data = response.data.webPages.value
      // console.log(JSON.stringify(response.data));
      // console.log('data = ', response.data.webPages.value[0]);
      console.log(response);
      return response;
    })
    .catch((error) => {
      console.log(error);
    });
  }

  return (
    <div className="App">
      <div>
        <h1>APP</h1>
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          <label>
            Search:
          <input
            name='search'
            type='text'
            placeholder='Search...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          </label>
          <input type='submit' value='Submit' />
        </form>
      </div>
      <div>
        <button onClick={() => {
            fetchSearch();
          }}
        >
          fetch random user
        </button>
      </div>
    </div>
  );
}

export default App;
