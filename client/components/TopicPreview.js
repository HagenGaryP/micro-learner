import React, { useState } from 'react';
import history from '../history';


function TopicPreview({ topic }) {
  const [hoverState, setHoverState] = useState(false);

  return (
    <div
      className="topic-card hover-links"
      onClick={() => history.push(`/topics/${topic.id}`)}
      onMouseEnter={() => setHoverState(true)}
      onMouseLeave={() => setHoverState(false)}
    >
    <div
    >
    {
      hoverState &&
      <div>
        <h2>{topic.category}</h2>
        {topic.description}
      </div>
    }
      <span>
        <img className="topic-img" src={topic.imageUrl} />
      <div className="topic-card-textarea">
        <p className="topic-card-name">
          {topic.name}
        </p>
      </div>
      </span>
    </div>
    </div>
  );
}

export default TopicPreview;
