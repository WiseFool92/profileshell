import React from 'react';
import NewPostForm from './NewPostForm';
import PostList from './PostList';
import PostDetail from './PostDetail';
import EditPostForm from './EditPostForm';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
import * as a from './../actions';
import { withFirestore, isLoaded } from 'react-redux-firebase';

class PostControl extends React.Component {

  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      selectedPost: null,
      editing: false
    };
  }

  // componentDidMount() {
  //   this.waitTimeUpdateTimer = setInterval(() =>
  //     this.updatePostElapsedWaitTime(),
  //   60000
  //   );
  // }

  // componentWillUnmount(){
  //   console.log("component unmounted!");
  //   clearInterval(this.waitTimeUpdateTimer);
  // }

  // updatePostElapsedWaitTime = () => {
  //   const { dispatch } = this.props;
  //   Object.values(this.props).forEach(post => {
  //     const newFormattedWaitTime = post.timeOpen.fromNow(true);
  //     const action = a.updateTime(post.id, newFormattedWaitTime);
  //     dispatch(action);
  //   });
  // }

  handleClick = () => {
    if (this.state.selectedPost != null) {
      this.setState({
        selectedPost: null,
        editing: false
      });
    } else {
      const { dispatch } = this.props;
      const action = a.toggleForm();
      dispatch(action);
    }
  }

  handleAddingNewPostToList = () => {
    const { dispatch } = this.props;
    const action = a.toggleForm();
    dispatch(action);
  }

  handleChangingSelectedPost = (id) => {
    this.props.firestore.get({collection: 'posts', doc: id}).then((post) => {
      const firestorePost = {
        title: post.get("title"),
        subject: post.get("subject"),
        description: post.get("description"),
        id: post.id
      }
      this.setState({selectedPost: firestorePost});
    });
  }
  
  handleDeletingPost = (id) => {
    this.props.firestore.delete({collection: 'posts', doc: id});
    this.setState({selectedPost: null});
  }
  
  handleEditClick = () => {
    this.setState({editing: true});
  }

  handleEditingPostInList = () => {
    this.setState({
      editing: false,
      selectedPost: null
    });
  }

  render(){
    let currentlyVisibleState = null;
    let buttonText = null;
    const auth = this.props.firebase.auth();
    
    if (!isLoaded(auth)){
      return (
        <>
          <h1>Loading...</h1>
        </>
      )
    }

    if ((isLoaded(auth)) && (auth.currentUser == null)) {
      return (
        <>
          <h1>You must be signed in as a user to create posts</h1>
        </>
      );
    }

    // Test to get viewers to view created posts
    if (this.props.formVisibleOnPage) {
      currentlyVisibleState =
      <NewPostForm
        onNewPostCreation = {this.handleAddingNewPostToList} />;
        buttonText = 'Return to Post List';
    }
    // Test

    if ((isLoaded(auth)) && (auth.currentUser != null)) {
      if (this.state.editing) {
        currentlyVisibleState =
        <EditPostForm
          post = {this.state.selectedPost}
          onEditPost = {this.handleEditingPostInList} />
          buttonText = 'Return to Post List';
      } else if (this.state.selectedPost != null) {
        currentlyVisibleState =
        <PostDetail
          post = {this.state.selectedPost}
          onClickingDelete = {this.handleDeletingPost}
          onClickingEdit = {this.handleEditClick} />
          buttonText = 'Return to Post List';
      } else if (this.props.formVisibleOnPage) {
        currentlyVisibleState =
        <NewPostForm
          onNewPostCreation = {this.handleAddingNewPostToList} />;
          buttonText = 'Return to Post List';
      } else {
        currentlyVisibleState =
        <PostList
          postList = {this.props}
          onPostSelection = {this.handleChangingSelectedPost} />;
          buttonText = 'Add Post';
      }
    }
    return (
      <>
        {currentlyVisibleState}
        <button onClick = {this.handleClick}>{buttonText}</button>
      </>
    );
  }
}


const mapStateToProps = state => {
  return {
    formVisibleOnPage: state.formVisibleOnPage
  }
};

PostControl = connect(mapStateToProps)(PostControl);

export default withFirestore(PostControl);