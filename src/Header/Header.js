import React from 'react';
import './Header.scss';
import UserName from '../ProfileSelect/UserName'
import RootStore from '../stores/RootStore';
import { inject, observer } from "mobx-react";

@inject("Store")
@observer
class Header extends React.Component {
	render() {
		const {Store} = this.props;
		let profileSelectMenu = null;
		if(Store.UserNameVisible === true){

			profileSelectMenu = <UserName/>
		}

		return (
			<div className='header'>
				{this.props.children}
				{
					//profileSelectMenu  раскомментить после тестирования
				}
				<UserName/> {/*Удалить после тестирования*/}
			</div>
		);
	}
}
export default Header