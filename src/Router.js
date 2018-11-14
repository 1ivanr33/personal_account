import React from 'react'
import LoginForm from './loginForm/loginForm';
import Desktop from './Desktop';
import Header from './Header/Header';
import Home from './Home';
import UserProfile from './ProfileSelect/UserProfile';
import CompanyProfile from './ProfileSelect/CompanyProfile';
import PasswordRecovery from './PasswordRecovery/PasswordRecovery';
import UserNotFound from './PasswordRecovery/UserNotFound';
import { BrowserRouter, /*Link,*/ Route } from 'react-router-dom';
import { Provider } from 'mobx-react';
import RootStore from './stores/RootStore';
import CheckYourEmail from './PasswordRecovery/CheckYourEmail';
import EnterNewPassword from './PasswordRecovery/EnterNewPassword';



/*const Home = () => (
	<div>
		<h2>Home</h2>
	</div>
)*/

/*const About = () => (
	<div>
		<h2>About</h2>
	</div>
)*/


const Router = () => (

	<BrowserRouter>
		<Provider Store={RootStore}>
			<div>
				<Desktop>
					{/*<ul>
					 <li><Link to="/">LoginForm</Link></li>
					 <li><Link to="/Home">Home</Link></li>
					 <li><Link to="/topics">Topics</Link></li>
					 </ul>

					 <hr/>*/}
					<Header/>
					<Route exact path="/" component={LoginForm}/>
					{/*//<Route component={Notice}/>*/}
					<Route path="/Home" component={Home}/>
					<Route path="/UserProfile" component={UserProfile}/>
					<Route path="/CompanyProfile" component={CompanyProfile}/>
					<Route path="/PasswordRecovery" component={PasswordRecovery}/>
					<Route path="/UserNotFound" component={UserNotFound}/>
					<Route path="/CheckYourEmail" component={CheckYourEmail}/>
					<Route path="/EnterNewPassword" component={EnterNewPassword}/>
				</Desktop>

			</div>
		</Provider>
	</BrowserRouter>

)

export default Router