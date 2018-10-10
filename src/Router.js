import React from 'react'
import LoginForm from './loginForm/loginForm';
import Desktop from './Desktop';
import Header from './Header/Header';
import Home from './Home';
import UserProfile from './ProfileSelect/UserProfile';
import CompanyProfile from './ProfileSelect/CompanyProfile';
import { BrowserRouter, Link, Route } from 'react-router-dom';
import { Provider } from 'mobx-react';
import RootStore from './stores/RootStore';




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

const Topic = ({ match }) => (
	<div>
		<h3>{match.params.topicId}</h3>
	</div>
)

export const Topics = ({ match }) => (
	<div>
		<h2>Topics</h2>
		<ul>
			<li>
				<Link to={`${match.url}/rendering`}>
					Rendering with React
				</Link>
			</li>
			<li>
				<Link to={`${match.url}/components`}>
					Components
				</Link>
			</li>
			<li>
				<Link to={`${match.url}/props-v-state`}>
					Props v. State
				</Link>
			</li>
		</ul>

		<Route path={`${match.path}/:topicId`} component={Topic}/>
		<Route exact path={match.path} render={() => (
			<h3>Please select a topic.</h3>
		)}/>
	</div>
)

const Tabs = () => (

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
				</Desktop>

			</div>
		</Provider>
	</BrowserRouter>

)

export default Tabs