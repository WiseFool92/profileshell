import React from "react";
import PropTypes from "prop-types";
import Post from './Post';
import { useSelector } from 'react-redux';
import { useFirestoreConnect, isLoaded, isEmpty } from 'react-redux-firebase';

function PostList(props){

  useFirestoreConnect([
    { collection: 'post' }
  ]);

  const posts = useSelector(state => state.firestore.ordered.posts);
  
  if (isLoaded(posts)) {
    return (
      <>
        <hr/>
        {posts.map((post) => {
          return <Post
            whenPostClicked = {props.onPostSelection}
            title = {post.title}
            subject = {post.subject}
            description = {post.description}
            formattedWaitTime = {post.formattedWaitTime}
            id = {post.id}
            key = {post.id}/>
        })}
      </>
    );
  } else {
    return (
      <>
        <h3>Loading...</h3>
      </>
    )
  }
}

PostList.propTypes = {
  onPostSelection: PropTypes.func
};

export default PostList;