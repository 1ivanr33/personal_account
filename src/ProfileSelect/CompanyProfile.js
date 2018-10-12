import React from 'react';
import './CompanyProfile.scss';
import { BrowserRouter, Link } from 'react-router-dom';
import CompanyProfileForm from '../Profiles/CompanyProfileForm';
import BreadCrumbsCompany from '../BreadCrumbs/BreadCrumbsCompany';

class CompanyProfile extends React.Component {
	render() {
		return (
			<div className='companyProfile'>

				<BreadCrumbsCompany/>

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