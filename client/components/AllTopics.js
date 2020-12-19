import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

import { TopicPreview } from './index';
import { removedTopic, fetchTopics, newTopic } from '../store';

/**
 * COMPONENT
 */
const AllTopics = ({ topics, deleteTopic, getTopics, addTopic }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const API_KEY = process.env.API_KEY;

  useEffect(() => {
    getTopics();

  }, []);

  // Fetch Searched Term
  const fetchSearch = async () => {
    // let info = [
    //   {name: 'Gary', url: 'http://hagengaryp.com', description: 'my website'},
    // ]
    // info.forEach((elem) => {
    //   addTopic(elem)
    // })
    let data = '';
    let config = {
      method: 'get',
      url: `https://api.bing.microsoft.com/v7.0/search?q=${searchTerm}`,
      headers: {
        'Ocp-Apim-Subscription-Key': `${API_KEY}`,
      },
      data: data,
    };
    return axios
      .get(
        `https://api.bing.microsoft.com/v7.0/search?q=${searchTerm}`,
        config
      )
      .then((response) => {
        data = response.data.webPages.value;

        // console.log(JSON.stringify(response.data));
        // console.log('data = ', response.data.webPages.value[0]);
        console.log(response);
        data.forEach((elem) => {
          addTopic(elem);
        });
        addTopic(data);

        return data;
      })
      .catch((error) => {
        console.log(error);
      });
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
              fetchSearch();
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
});

export default connect(mapStateToProps, mapDispatch)(AllTopics);
