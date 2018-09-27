import React from 'react'
import LoginForm from './loginForm/loginForm';
import FooterNavBar from './FooterNavBar/FooterNavBar';
import Desktop from './Desktop';
import Header from './Header/Header';
import Notice from './Notice';
import Home from './Home';
import { BrowserRouter, Link, Route } from 'react-router-dom';




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

const Topics = ({ match }) => (
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
		<div>
			<Desktop>
				{/*<ul>
					<li><Link to="/">LoginForm</Link></li>
					<li><Link to="/Home">Home</Link></li>
					<li><Link to="/topics">Topics</Link></li>
				</ul>

				<hr/>*/}
				<Route component={Header}/>
				<Route exact path="/" component={LoginForm}/>
				{/*//<Route component={Notice}/>*/}
				<Route path="/Home" component={Home}/>
				<Route path="/topics" component={Topics}/>

			</Desktop>
			<Route component={FooterNavBar}/>
		</div>
	</BrowserRouter>

)

export default Tabs