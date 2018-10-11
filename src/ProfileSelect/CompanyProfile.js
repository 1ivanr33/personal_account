import React from 'react';
import './CompanyProfile.scss';
import { BrowserRouter, Link } from 'react-router-dom';
import CompanyProfileForm from '../Profiles/CompanyProfileForm';
import BreadCrumbs from '../BreadCrumbs/BreadCrumbs';

class CompanyProfile extends React.Component {
	render() {
		return (
			<div className='companyProfile'>

				<BreadCrumbs/>

				<ul>
					<li><Link to='/UserProfile'>Профиль пользователя</Link></li>
					<li><Link to='/CompanyProfile'  id='link-current' >Профиль компании</Link></li>
					<li><Link to='/'>Выйти</Link></li>
				</ul>

				<CompanyProfileForm/>
			</div>
		);
	}
}
export default CompanyProfile