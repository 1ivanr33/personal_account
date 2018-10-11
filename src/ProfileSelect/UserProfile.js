import React from 'react';
import './UserProfile.scss';
import { BrowserRouter, Link } from 'react-router-dom';
import UserProfileForm from '../Profiles/UserProfileForm';
import BreadCrumbs from '../BreadCrumbs/BreadCrumbs';

class UserProfile extends React.Component {
	render() {
		return (
			<div className='userProfile'>

				<BreadCrumbs/>

				<ul>
					<li><Link to='/UserProfile' id='link-current'>Профиль пользователя</Link></li>
					<li><Link to='/CompanyProfile' >Профиль компании</Link></li>
					<li><Link to='/'>Выйти</Link></li>
				</ul>

				<UserProfileForm/>
			</div>
		);
	}
}
export default UserProfile