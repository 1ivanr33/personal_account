import React from 'react';
import './CompanyProfile.scss';
import { Link } from 'react-router-dom';
import CompanyProfileForm from '../Profiles/CompanyProfileForm';
import BreadCrumbsCompany from '../BreadCrumbs/BreadCrumbsCompany';

class CompanyProfile extends React.Component {
	render() {
		if (!( localStorage.getItem('securityToken') || (sessionStorage.getItem('securityToken')))){
			this.props.history.push("/");
		}
		return (
			<div className='companyProfile'>

				<BreadCrumbsCompany/>

				<ul>
					<li><Link to='/UserProfile'>Профиль пользователя</Link></li>
					<li><Link to='/CompanyProfile'  id='link-current' >Профиль компании</Link></li>
					<li><Link onClick={this.onLinkClickExit} to='/'>Выйти</Link></li>
				</ul>

				<CompanyProfileForm/>
			</div>
		);
	}

	onLinkClickExit() {
		sessionStorage.clear();
		localStorage.clear();
	}
}
export default CompanyProfile