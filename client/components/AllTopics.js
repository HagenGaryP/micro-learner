import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

import { TopicPreview } from './index';
import { removedTopic, fetchTopics, newTopic, fetchSearchedTopics } from '../store';

// import { API_KEY } from '../../server';
// import {search} from '../../server/api/utility/utility'

/**
 * COMPONENT
 */
const AllTopics = ({ topics, deleteTopic, getTopics, addTopic, searchTopics }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [data, setData] = useState([]);

  const API_KEY = process.env.API_KEY;

  useEffect(() => {
    getTopics();
    setData([...data, topics])
    // console.log('API KEY >>>>> ', API_KEY);
    // console.log('search function >>>>> ', search);

  }, []);

  useEffect(() => {
    console.log('useEffect >>> data changed to ', data)
    getTopics();
  }, [data]);

  // handle Searched Term
  const handleSearch = async () => {

    const newData = await searchTopics(searchTerm);
    // data.forEach((elem) => {
    //   addTopic(elem);
    // });
    // addTopic(data);

    // console.log('array? ', typeof newData);
    // let newData = JSON.parse(newData)
    setData([...data, newData])

    console.log('handle search... newData = ', newData)

  };

  return (
    <div className="all-topics-start">
      <div>
        <h1>Search More Content</h1>
        <form
          onSubmit={() => {
            console.log('submitted ', searchTerm);
          }}
        >
          <label>
            Search:
            <input
              name="search"
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </label>
          {/* <input type='submit' value='Submit' /> */}
          <button
            type="button"
            onClick={() => {
              // fetchSearch();
              handleSearch(searchTerm);
            }}
          >
            Search
          </button>
        </form>
      </div>

      <div className="top-area-container">
      </div>
      {/* ---------- topics ----------*/}
      <div className="all-topics-container">
        {Array.isArray(topics) &&
          topics.map((topic) => {
            return (
              <TopicPreview
                key={topic.id}
                topic={topic}
              />
            );
          })}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  topics: state.topics,
});

const mapDispatch = (dispatch) => ({
  getTopics: () => dispatch(fetchTopics()),
  addTopic: (info) => dispatch(newTopic(info)),
  searchTopics: (val) => dispatch(fetchSearchedTopics(val))
});

export default connect(mapStateToProps, mapDispatch)(AllTopics);
