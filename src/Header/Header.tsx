import React from 'react';
import './Header.scss';
import UserName from '../ProfileSelect/UserName';
import NoticeList from '../Notifications/NoticeList'

class Header extends React.Component {
	render() {
		let profileSelectMenu, noticeIcon = null;
		if (localStorage.getItem('securityToken') || sessionStorage.getItem('securityToken')) {
			profileSelectMenu = <UserName/>
			noticeIcon = <NoticeList/>
		}

		return (
			<div className='header'>
				{this.props.children}
				{profileSelectMenu}
				{noticeIcon}
			</div>
		);
	}
}

export default Header