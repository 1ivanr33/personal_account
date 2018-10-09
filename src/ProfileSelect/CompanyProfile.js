import React from 'react';
import './CompanyProfile.scss';
import { BrowserRouter, Link } from 'react-router-dom';


class CompanyProfile extends React.Component {
	render() {
		return (
			<div>

				<ul className='companyProfile'>
					<li><Link to="/UserProfile">Профиль пользователя</Link></li>
					<li><Link to="/CompanyProfile" id='link-current'>Профиль компании</Link></li>
					<li><Link to="/">Выйти из ЕИРЦ</Link></li>
				</ul>
			</div>
		);
	}
}
export default CompanyProfile