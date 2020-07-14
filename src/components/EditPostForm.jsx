import React from "react";
import ReusableForm from "./ReusableForm";
import PropTypes from "prop-types";
import { useFirestore } from 'react-redux-firebase';

function EditPostForm (props) {
  const firestore = useFirestore();
  const { post } = props;

  function handleEditPostFormSubmission(event) {
    event.preventDefault();
    props.onEditPost();
    const propertiesToUpdate = {
      title: event.target.title.value, 
      subject: event.target.subject.value, 
      description: event.target.description.value
    }
    return firestore.update({collection: 'posts', doc: post.id },propertiesToUpdate)
  }
  return (
    <>
      <ReusableForm 
        formSubmissionHandler={handleEditPostFormSubmission}
        buttonText="Update" />
    </>
  );
}

EditPostForm.propTypes = {
  onEditPost: PropTypes.func
};

export default EditPostForm;