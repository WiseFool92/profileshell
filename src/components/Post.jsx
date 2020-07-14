import React from "react";
import PropTypes from "prop-types";

function Post(props){
  return (
    <>
      <div>
        <div onClick = {() => props.whenPostClicked(props.id)}>
          <h2>{props.title}</h2><br/>
          <h3>{props.subject} </h3><br/>
          <p><em>{props.description}</em></p>
        </div>
      </div>
      <hr/>
    </>
  );
}

Post.propTypes = {
  title: PropTypes.string,
  subject: PropTypes.string,
  description: PropTypes.string,
  id: PropTypes.string,
  whenPostClicked: PropTypes.func
};

export default Post;