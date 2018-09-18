import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import loginForm from './loginForm';
import Router from './Router';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render((
	<Router>
	<loginForm />
	</Router>)
	,document.getElementById('root'));
registerServiceWorker();
