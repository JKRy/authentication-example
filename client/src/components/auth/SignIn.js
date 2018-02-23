import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';

const renderInput = field => (
    <div>
        <input {...field.input} type={field.type} />
        {
            field.meta.touched &&
            field.meta.error &&
            <span className='error'>{field.meta.error}</span>
        }
    </div>
);

class SignIn extends Component {
    handleFormSubmit = ({ email, password }) => {
        console.log(email, password);
    }

    render() {
        const { handleSubmit } = this.props;

        return (
            <form onSubmit={handleSubmit(this.handleFormSubmit)}>
                <fieldset className='form-group'>
                    <label>Email:</label>
                    <Field
                        className='form-control'
                        name='email'
                        component={renderInput}
                        type='text'
                    />
                </fieldset>
                <fieldset className='form-group'>
                    <label>Password:</label>
                    <Field
                        className='form-control'
                        name='password'
                        component={renderInput}
                        type='password'
                    />
                </fieldset>
                <button
                    action='submit'
                    className='btn btn-primary'>
                    Sign In
                </button>
            </form>
        );
    }
}

export default reduxForm({
    form: 'signin'
})(SignIn);