import 'core-js/stable';
import 'regenerator-runtime/runtime';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import AppProvider from '_providers';
import Root from './Root';
import Container from './Container';

const app = (
  <Router>
    <AppProvider>
      <Container Component={Root} />
    </AppProvider>
  </Router>
);

const root = document.createElement('div');
root.setAttribute('id', 'root');
document.body.prepend(root);

ReactDOM.render(app, document.getElementById('root'));

const initialLoader = document.querySelector('.splash-screen');
initialLoader.style.display = 'none';
