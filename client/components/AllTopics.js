import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
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
    try {
      const newData = await searchTopics(searchTerm);
      console.log('newData = ', newData);
      setData([...data, newData])
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="all-topics-start">
      <div className="search-container">
        <div className="add-topic">
          <Link to="/topics/add"> Add A New Topic </Link>
        </div>
        <h1 className="search-header">Search More Content</h1>
        <form
          onSubmit={() => handleSearch(searchTerm)}
        >
          <label>
            <input
              name="search"
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </label>
          <button
            className="btn-search"
            type="button"
            onClick={() => handleSearch(searchTerm)}
          >
            Search
          </button>
        </form>

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
