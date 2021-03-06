import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import history from '../history';
import { fetchSingleTopic, removedTopic } from '../store';


const SingleTopic = ({
  topic,
  fetchTopic,
  match,
  deleteTopic
}) => {
  useEffect(() => {
    fetchTopic(match.params.id)
  }, [])

  return (
    <div className="single-topic-container">
      <div className="single-topic-img-container">
        <img className="single-topic-img" src={topic.imageUrl} />
        <button
        className="btn-delete"
        type="button"
        onClick={() => {
          deleteTopic(topic.id);
          history.goBack();
        }}
      >
        DELETE
      </button>
      </div>
      <div className="single-topic-info-container">
        <a className="topic-link" href={`${topic.url}`}>
          {topic.name}
        </a>
        <div className="single-topic-description">
          {topic.description}
        </div>
      </div>
    </div>
  )
}

const mapState = (state) => {
  return {
    topic: state.singleTopic,
  }
}
const mapDispatch = (dispatch) => {
  return {
    fetchTopic: (topicId) => dispatch(fetchSingleTopic(topicId)),
    deleteTopic: (topicId) => dispatch(removedTopic(topicId))
  }
}

export default connect(mapState, mapDispatch)(SingleTopic);
