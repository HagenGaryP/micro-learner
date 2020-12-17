import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './App.css';

function App() {

  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

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
    </div>
  );
}

export default App;
