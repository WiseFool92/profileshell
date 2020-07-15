import React from "react";
import PropTypes from "prop-types";

function PostDetail(props) {
  const { post, onClickingDelete } = props;

  return (
    <>
      <h1>Post Detail</h1>
      <h3>{post.title} - {post.subject}</h3>
      <br></br>
      <p>{post.description}</p>
      <button onClick = { props.onClickingEdit }>Update Post</button>      
      <button onClick = {() => onClickingDelete(post.id)}>Close Post</button>
    </>
  );
}

PostDetail.propTypes = {
  post: PropTypes.object,
  onClickingDelete: PropTypes.func,
  onClickingEdit: PropTypes.func
};

export default PostDetail;