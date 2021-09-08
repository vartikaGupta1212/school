import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createStore, compose, applyMiddleware, combineReducers } from "redux";
import assignmentReducer from "./store/reducers/assignments";
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import authReducer from './store/reducers/auth';
import gradedAssignmentReducer from "./store/reducers/gradedAssignments";
const composeEnhances = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const rootReducer = combineReducers({
    auth: authReducer,
    assignments: assignmentReducer,
    gradedAssignments: gradedAssignmentReducer
    
    
  });
  
const store = createStore(rootReducer, composeEnhances(
    applyMiddleware(thunk)
));

const app = (
    <Provider store={store}>
        <App />
    </Provider>
)
ReactDOM.render(app, document.getElementById('root'));

