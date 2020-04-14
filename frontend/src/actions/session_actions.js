// src/actions/session_actions.js

// impport whole thing, will add functions
import * as APIUtil from '../util/session_api_util';
import jwt_decode from 'jwt-decode';

// This pattern should be familiar from full stack project

export const RECEIVE_CURRENT_USER = "RECEIVE_CURRENT_USER";
export const RECEIVE_SESSION_ERRORS = "RECEIVE_SESSION_ERRORS";
export const RECEIVE_USER_LOGOUT = "RECEIVE_USER_LOGOUT";
export const RECEIVE_USER_SIGN_IN = "RECEIVE_USER_SIGN_IN";

// dispatch when user signs in
export const receiveCurrentUSer = currentUser => ({
  type: RECEIVE_CURRENT_USER,
  currentUser,
});

// Used to redirect user to login page on signup
export const receiveUserSignIn = () => ({
  type: RECEIVE_USER_SIGN_IN
});

// dispatch when there are authentication errors on frontend
export const logoutUser = () => ({
  type: RECEIVE_USER_LOGOUT
});

export const signup = user => dispatch => (
  APIUtil.signup(user).then(() => (
    dispatch(receiveUserSignIn())
  ), err => (
    dispatch(receiveErrors(err.response.data))
  ))
);

export const login = user => dispatch => (
  APIUtil.login(user).then(res => {
    const { token } = res.data;
    localStorage.setItem('jwtToken', token);
    APIUtil.setAuthToken(token);
    const decoded = jwt_decode(token);
    dispatch(receiveCurrentUSer(decoded));
  })
  .catch(err => {
    dispatch(receiveErrors(err.response.data));
  })
)

export const logoutUser = () => ({
  type: RECEIVE_USER_LOGOUT
});

export const logout = () => dispatch => {
  // Remove the token from local storage
  localStorage.removeItem('jwtToken');
  // Remove the token from the common axios header
  APIUtil.setAuthToken(false);
  // Dispatch logout action
  dispatch(logoutUser());
}