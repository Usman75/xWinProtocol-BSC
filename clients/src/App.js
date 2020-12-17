import React, { Component, Suspense } from 'react';
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import { ReduxFirestoreProvider, firebaseReducer } from 'react-redux-firebase'
import { createFirestoreInstance, firestoreReducer } from 'redux-firestore'
import firebase from "firebase/app";
import 'firebase/auth'
import "firebase/firestore";
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { Chart } from 'react-chartjs-2';
import { ThemeProvider } from '@material-ui/styles';
import validate from 'validate.js';

import { chartjs } from './helpers';
import theme from './theme';
import 'react-perfect-scrollbar/dist/css/styles.css';
import './assets/scss/index.scss';
import validators from './common/validators';
import Routes from './Routes';

import config from './config';
//import { ProvideAuth } from "./use-auth.js/index.js.js";
import './i18n'

// Initialize firebase instance
firebase.initializeApp(config);

// Initialize other services on firebase instance
firebase.firestore()
// firebase.functions() // <- needed if using httpsCallable

// Add firebase to reducers
const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
})

// Create store with reducers and initial state
const initialState = {}
const store = createStore(rootReducer, initialState)


const rrfProps = {
  firebase,
  config: config,
  dispatch: store.dispatch,
  createFirestoreInstance,
}

const browserHistory = createBrowserHistory();

Chart.helpers.extend(Chart.elements.Rectangle.prototype, {
  draw: chartjs.draw
});

validate.validators = {
  ...validate.validators,
  ...validators
};

export default class App extends Component {
  render() {
    return (
      <Suspense fallback={null}>
        <Provider store={store}>
                <ReduxFirestoreProvider {...rrfProps}>
                  {/* <ProvideAuth> */}
                    <ThemeProvider theme={theme}>
                      <Router history={browserHistory}>
                        <Routes />
                      </Router>
                    </ThemeProvider>
                  {/* </ProvideAuth> */}
                </ReduxFirestoreProvider>
            </Provider>
      </Suspense>
    
    );
  }
}
