import React from 'react';
import './Header.scss';
import UserName from '../ProfileSelect/UserName'
//import RootStore from '../stores/RootStore';

class Header extends React.Component {
	render() {
		let profileSelectMenu = null;
		if (localStorage.getItem('securityToken') || sessionStorage.getItem('securityToken')){
			profileSelectMenu = <UserName/>
		}

		return (
			<div className='header'>
				{this.props.children}
				{
					profileSelectMenu
				}
			</div>
		);
	}
}
export default Header