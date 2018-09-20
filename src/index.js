import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import loginForm from './loginForm';
import Router from './Router';
import registerServiceWorker from './registerServiceWorker';
import FooterNavBar from './FooterNavBar'


ReactDOM.render((
		<div className='desktop'>
			<Router>
				<loginForm />
				<FooterNavBar />
			</Router>
		</div>)
	, document.getElementById('root'));
registerServiceWorker();
