import React from "react";
import PropTypes from "prop-types";

function ReusableForm(props) {
  return (
    <>
      <form onSubmit={props.formSubmissionHandler}>
        <input
          type='text'
          name='title'
          placeholder='Title' /><br/>
        <input
          type='text'
          name='subject'
          placeholder='Subject' /><br/>
        <textarea
          name='description'
          placeholder='Description' />
        <button type='submit'>{props.buttonText}</button>
      </form>
    </>
  );
}

ReusableForm.propTypes = {
  formSubmissionHandler: PropTypes.func,
  buttonText: PropTypes.string
};

export default ReusableForm;