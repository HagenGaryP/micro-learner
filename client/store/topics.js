/* eslint-disable no-case-declarations */
import axios from 'axios';

export const SEARCH_TOPICS = 'SEARCH_TOPICS';
export const GET_TOPICS = 'GET_TOPICS';
export const ADD_TOPIC = 'ADD_TOPIC';
export const REMOVE_TOPIC = 'REMOVE_TOPIC';

const searchTopics = (topics) => ({ type: SEARCH_TOPICS, topics });
const getTopics = (topics) => ({ type: GET_TOPICS, topics });
const addTopic = (topic) => ({ type: ADD_TOPIC, topic });
const removeTopic = (TopicId) => ({ type: REMOVE_TOPIC, TopicId });

export const fetchSearchedTopics = (searchTerm) => async (dispatch) => {
  try {
    const { data } = await axios.get(`/api/topics/search/${searchTerm}`);
    dispatch(searchTopics(data));
  } catch (err) {
    console.error(err);
  }
};


export const fetchTopics = () => async (dispatch) => {
  try {
    const { data } = await axios.get('/api/topics');
    dispatch(getTopics(data));
  } catch (err) {
    console.error(err);
  }
};

export const newTopic = (info) => async (dispatch) => {
  if (Array.isArray(info)) {
    info = info[0];
  }
  try {
    const { data } = await axios.post('/api/topics/add', info);
    dispatch(addTopic(data));
  } catch (error) {
    console.error(error);
  }
};

export const removedTopic = (topicId) => async (dispatch) => {
  try {
    await axios.delete(`/api/topics/${topicId}`);
    dispatch(removeTopic(topicId));
  } catch (error) {
    console.error(error);
  }
};

const defaultTopics = [];

export default function (state = defaultTopics, action) {
  switch (action.type) {
    case GET_TOPICS:
      return [...action.topics];
    case ADD_TOPIC:
      return [...state, action.topic];
    case REMOVE_TOPIC:
      const filteredTopic = state.filter(
        (topic) => topic.id !== action.topicId
      );
      return filteredTopic;
    default:
      return state;
  }
}
