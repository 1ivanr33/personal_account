import React from 'react';
import './UserProfile.scss';
import { BrowserRouter, Link } from 'react-router-dom';
import UserProfileForm from '../Profiles/UserProfileForm';


class UserProfile extends React.Component {
	render() {
		return (
			<div className='userProfile'>

				<ul>
					<li><Link to='/UserProfile' id='link-current'>Профиль пользователя</Link></li>
					<li><Link to='/CompanyProfile' >Профиль компании</Link></li>
					<li><Link to='/'>Выйти из ЕИРЦ</Link></li>
				</ul>

				<UserProfileForm/>
			</div>
		);
	}
}
export default UserProfile