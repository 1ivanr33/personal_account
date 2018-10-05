import React from 'react';
import { BrowserRouter, Link } from 'react-router-dom';


class CompanyProfile extends React.Component {
	render() {
		return (
			<div>
				<h1>CompanyProfile</h1>
				<ul>
					<li><Link to="/UserProfile">Профиль пользователя</Link></li>
					<li><Link to="/CompanyProfile">Профиль компании</Link></li>
					<li><Link to="/">Выйти из ЕИРЦ</Link></li>
				</ul>
			</div>
		);
	}
}
export default CompanyProfile