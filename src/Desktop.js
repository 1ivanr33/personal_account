import React from 'react';
import './Desktop.scss';
import RootStore from './stores/RootStore';
import { inject, observer } from "mobx-react";
import BackOpacity from './ProfileSelect/BackOpacity';

@inject("Store")
@observer
class Desktop extends React.Component {
	render() {
		const {Store} = this.props;
		let backGroundOpacity = null;
		if(Store.UserMenuVisible === 'visible'){
			backGroundOpacity = <BackOpacity/>
		}

		return (
			<div className='desktop'>
				{backGroundOpacity}
				{this.props.children}
			</div>
		);
	}
}
export default Desktop