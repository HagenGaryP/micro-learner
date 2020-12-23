import React from 'react';
import history from '../history';

function TopicPreview({ topic }) {
  return (
    <div className="topic-card">
      <div className="topic-card-textarea">
        <p
          onClick={() => history.push(`/topics/${topic.id}`)}
          className="topic-card-name hover-links"
        >
          {topic.name}
        </p>
      </div>
    </div>
  );
}

export default TopicPreview;
