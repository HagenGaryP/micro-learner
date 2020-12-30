import React from 'react';
import history from '../history';

function TopicPreview({ topic }) {
  return (
    <div
      className="topic-card hover-links"
      onClick={() => history.push(`/topics/${topic.id}`)}
    >
      <span>
        <img className="topic-img" src={topic.imageUrl} />
      <div className="topic-card-textarea">
        <p className="topic-card-name">
          {topic.name}
        </p>
      </div>
      </span>
    </div>
  );
}

export default TopicPreview;
