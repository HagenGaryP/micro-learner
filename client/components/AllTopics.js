import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Rating, Pagination } from '@material-ui/lab';
import { FaThList } from 'react-icons/fa';
import { BsFillGrid3X2GapFill } from 'react-icons/bs';
import SearchBar from 'material-ui-search-bar';
import Fab from '@material-ui/core/Fab';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

import { TopicPreview } from './index';
import { removedTopic, fetchTopics, newTopic } from '../store';

import { toast } from 'react-toastify';
import { FormatAlignCenter } from '@material-ui/icons';
toast.configure();

/**
 * COMPONENT
 */
const AllTopics = ({ topics, deleteTopic, getTopics, addTopic }) => {
  const [text, setText] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [newSearchTerm, setNewSearchTerm] = useState('');

  const API_KEY = '9195feb0ae9042b3ad466e98e14a9382';

  useEffect(() => {
    getTopics();
  }, []);

  const handleOnClick = (id) => {
    deleteTopic(id);
  };

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
      url: `https://api.bing.microsoft.com/v7.0/search?q=${newSearchTerm}`,
      headers: {
        'Ocp-Apim-Subscription-Key': `${API_KEY}`,
      },
      data: data,
    };
    return axios
      .get(
        `https://api.bing.microsoft.com/v7.0/search?q=${newSearchTerm}`,
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

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div className="all-topics-start">
      <div>
        <h1>Search More Content</h1>
        <form
          onSubmit={() => {
            console.log('submitted ', newSearchTerm);
            // handleSubmit();
          }}
        >
          <label>
            Search:
            <input
              name="search"
              type="text"
              placeholder="Search..."
              value={newSearchTerm}
              onChange={(e) => setNewSearchTerm(e.target.value)}
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
        <div className="search-bar-container">
          <SearchBar
            value={text}
            onChange={(newValue) => setText(newValue)}
            onRequestSearch={() => {
              setSearchTerm(text);
            }}
            onCancelSearch={() => {
              setSearchTerm('');
              setText('');
            }}
          />
          <span className="divider-bar" />
        </div>
      </div>
      {/* ---------- topics ----------*/}
      <div className="all-topics-container">
        {Array.isArray(topics) &&
          topics.map((topic) => {
            return (
              <TopicPreview
                key={topic.id}
                topic={topic}
                handleOnClick={handleOnClick}
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
  deleteTopic: (topicId) => dispatch(removedTopic(topicId)),
  addTopic: (info) => dispatch(newTopic(info)),
});

export default connect(mapStateToProps, mapDispatch)(AllTopics);
