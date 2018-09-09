import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import { validateForm, sessionStore } from "@/utils";
import { userAction } from "@/actions";
import { NavBar, InlineError } from "@/components/global";
import LoginForm from "./LoginForm";

class LoginPage extends React.Component {
  state = {
    clientErrors: {},
    credentials: {
      username: "",
      password: ""
    }
  };

  componentWillUnmount() {
    this.setState({
      credentials: {
        username: "",
        password: ""
      }
    });
  }

  redirectToRegister = () => {
    const { history } = this.props;
    history.push("/register");
  };

  handleChange = e => {
    const { credentials } = this.state;
    const field = e.target.name;
    credentials[field] = e.target.value;

    this.setState({
      credentials
    });
  };

  handleLogin = e => {
    e.preventDefault();

    const { credentials } = this.state;

    const clientErrors = validateForm.login(credentials);
    this.setState({ clientErrors });
    if (Object.keys(clientErrors).length === 0) {
      const { loginUser } = this.props;
      loginUser(credentials);
    }
  };

  render() {
    const { clientErrors, credentials } = this.state;
    const { error } = this.props;
    const isUserLoggedIn = sessionStore.getLoginStatus();
    return (
      <React.Fragment>
        {isUserLoggedIn && <Redirect to="/" />}
        <NavBar />
        <main className="login-page">
          <LoginForm
            handleLogin={this.handleLogin}
            onChange={this.handleChange}
            redirectToRegister={this.redirectToRegister}
            clientErrors={clientErrors}
            credentials={credentials}
          />
          <br />
          {error && <InlineError text={error} />}
        </main>
      </React.Fragment>
    );
  }
}

LoginPage.propTypes = {
  history: PropTypes.object.isRequired,
  loginUser: PropTypes.func.isRequired,
  error: PropTypes.string
};

const stateToProps = state => ({
  error: state.userReducer.error
});

const dispatchToProps = dispatch => ({
  loginUser: credential => {
    dispatch(userAction.loginUser(credential));
  }
});

export default connect(
  stateToProps,
  dispatchToProps
)(LoginPage);