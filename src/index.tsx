import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import Router from './Router';
import registerServiceWorker from './registerServiceWorker';
import {GoogleReCaptchaProvider} from 'react-google-recaptcha-v3';




ReactDOM.render((<GoogleReCaptchaProvider reCaptchaKey="6LfMM44UAAAAAJv9L-Top8Vf_yE5uVpH-eELCLs2">
		<Router/>
	</GoogleReCaptchaProvider>),
	document.getElementById('root'));
registerServiceWorker();
