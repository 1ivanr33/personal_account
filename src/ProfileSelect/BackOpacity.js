import React from 'react';
import './BackOpacity.scss';
import UserName from '../ProfileSelect/UserName'
import RootStore from '../stores/RootStore';
import { inject, observer } from "mobx-react";

@inject("Store")
@observer
class BackOpacity extends React.Component {
	render() {
		const {Store} = this.props;
		let backGroundOpacity = null;
		if(Store.UserMenuVisible === 'visible'){
			backGroundOpacity = <BackOpacity/>
		}

		return (

			<BackOpacity>
			<div className='opacity'>

			</div>
		<BackOpacity/>
		);
	}
}
export default BackOpacity