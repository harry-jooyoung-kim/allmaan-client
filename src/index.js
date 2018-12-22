import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import string from './lib/string';
import {firebaseInit} from "./firebase";
firebaseInit();

ReactDOM.render(<App/>, document.getElementById('root'));
registerServiceWorker();
