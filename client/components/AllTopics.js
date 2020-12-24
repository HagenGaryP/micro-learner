import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { TopicPreview } from './index';
import { fetchTopics, newTopic, fetchSearchedTopics } from '../store';

const AllTopics = ({ topics, deleteTopic, getTopics, addTopic, searchTopics }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [data, setData] = useState([]);

  useEffect(() => {
    getTopics();
    setData([...data, topics])
  }, []);

  useEffect(() => {
    getTopics();
  }, [data]);

  // handle Searched Term
  const handleSearch = async () => {
    const newData = await searchTopics(searchTerm);
    setData([...data, newData])
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
          <button
            type="button"
            onClick={() => {
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
