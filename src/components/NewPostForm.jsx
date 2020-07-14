import React from "react";
import PropTypes from "prop-types";
import ReusableForm from "./ReusableForm";
import { useFirestore } from 'react-redux-firebase';

function NewPostForm(props){
  const firestore = useFirestore();

  function addPostToFirestore(event) {
    event.preventDefault();
    props.onNewPostCreation();

    return firestore.collection('posts').add(
      {
        title: event.target.title.value,
        subject: event.target.subject.value,
        description: event.target.description.value,
        timeOpen: firestore.FieldValue.serverTimestamp()
      }
    );
  }

  return (
    <>
      <ReusableForm 
        formSubmissionHandler={addPostToFirestore}
        buttonText="Create" />
    </>
  );
}

NewPostForm.propTypes = {
  onNewPostCreation: PropTypes.func
};

export default NewPostForm;