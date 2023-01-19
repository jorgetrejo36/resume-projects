import React from "react";

const Entry = (props) => (
  <div className="term">
    <dt>
      <span className="emoji" role="img" aria-label="Tense Biceps">
        {props.emoji}
      </span>
      <span>{props.name}</span>
    </dt>
    <dd>{props.group}</dd>
  </div>
);

export default Entry;
