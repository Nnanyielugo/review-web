import 'core-js/stable';
import 'regenerator-runtime/runtime';
import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import Container from './container';

const app = (
  <Container Component={App} />
);

const root = document.createElement('div');
root.setAttribute('id', 'root');
document.body.prepend(root);

ReactDOM.render(app, document.getElementById('root'));

const initialLoader = document.querySelector('.splash-screen');
initialLoader.style.display = 'none';
