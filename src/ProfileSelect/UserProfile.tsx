import React from 'react';
import './UserProfile.scss';
import {Link, RouteComponentProps} from 'react-router-dom';
import UserProfileForm from '../Profiles/UserProfileForm';
import BreadCrumbs from '../BreadCrumbs/BreadCrumbs';

class UserProfile extends React.Component<RouteComponentProps> {
	render() {
		if (!( localStorage.getItem('securityToken') || (sessionStorage.getItem('securityToken')))){
			this.props.history.push("/");
		}
		return (

			<div className='userProfile'>

				<BreadCrumbs/>

				<ul>
					<li><Link to='/UserProfile' id='link-current'>Профиль пользователя</Link></li>
					<li><Link to='/CompanyProfile' >Профиль компании</Link></li>
					<li><Link onClick={this.onLinkClickExit} to='/'>Выйти</Link></li>
				</ul>

				<UserProfileForm/>
			</div>
		);
	}

	onLinkClickExit() {
		sessionStorage.clear();
		localStorage.clear();
	}
}
export default UserProfile