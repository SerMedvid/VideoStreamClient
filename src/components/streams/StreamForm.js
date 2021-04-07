import React from "react";
import {Field, reduxForm} from "redux-form";

const validate = (formValues) => {
  const errors = {};

  if (!formValues.title) {
    errors.title = 'Email is required field'
  }

  if (!formValues.description) {
    errors.description = 'Description is required field';
  }

  return errors;
}

const renderError = ({error, touched}) => {
  if (touched && error) {
    return (
      <div className="ui error message">
        <div className="header">{error}</div>
      </div>
    )
  }
}

const renderInput = ({input, label, meta}) => {
  const dateNow = Date.now();
  const fieldId = `${input.name}-${dateNow}`;
  const errorClass = `field ${meta.error && meta.touched ? 'error' : ''}`;

  return (
    <div className={errorClass}>
      <label htmlFor={fieldId} >{label}</label>
      <input type="text"
             id={fieldId}
             {...input}
             autoComplete="false"
        // onChange={formProps.input.onChange}
        // value={formProps.input.value}
      />
      {renderError(meta)}
    </div>
  )
}

const StreamForm = (props) => {
  const onSubmit = (formValues) => {
    props.onSubmit(formValues);
  }

  return (
    <form className="ui form error" onSubmit={props.handleSubmit(onSubmit)}>
      <Field name="title" component={renderInput} label="Enter Title" />
      <Field name="description" component={renderInput} label="Enter Description" />
      <button className="ui button primary" type="submit">Submit</button>
    </form>
  );
}

export default reduxForm({
  form: 'streamForm',
  validate
})(StreamForm);