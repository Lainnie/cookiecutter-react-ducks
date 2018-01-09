import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

import { authOperations, authSelectors } from '../../core/auth';
import { TextField } from '../Lib';

export class LoginPage extends React.Component {
  onSubmit = (values = {}) => {
    this.props.login(values.username, values.password);
  };

  render() {
    return <LoginView {...this.props} onSubmit={this.onSubmit} />;
  }
}

const LoginView = ({ onSubmit, submitError }) => (
  <Container className="background_login">
    <Logo src="images/logo_login.png" />
    <LoginForm onSubmit={onSubmit} submitError={submitError} />
  </Container>
);

const FormView = ({ handleSubmit, submitError }) => (
  <Form className="card" onSubmit={handleSubmit}>
    <div>
      <label htmlFor="username">Username</label>
      <TextField name="username" component="input" type="text" />
    </div>
    <div>
      <label htmlFor="password">Password</label>
      <Field className="" name="password" component="input" type="password" />
    </div>
    {submitError && (
      <strong className="flow-text red-text text-darken-2">
        Wrong credentials
      </strong>
    )}
    <button className="waves-effect waves-light btn" type="submit">
      Submit
    </button>
  </Form>
);

const LoginForm = reduxForm({
  form: 'login',
})(FormView);

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
`;

const Logo = styled.img`
  display: block;
  width: 210px;
  height: auto;
  margin: 40px auto;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 400px;
  padding: 40px 0;
`;

const mapStateToProps = state => ({
  submitError: authSelectors.getSubmitError(state),
});
const mapDispatchToProps = {
  login: authOperations.login,
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
