import React from 'react';
import ProfileSelect from './ProfileSelect';
import './UserName.scss';
//import $ from 'jquery';
//window.jQuery = window.$ = $;

class UserName extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			showMenu: 'hidden'
		};
		this.toggleMenuShow = this.toggleMenuShow.bind(this);
		this.onProfileSelectBlur = this.onProfileSelectBlur.bind(this);
	}



	render() {
		return (
			<div className='userName'>
				<span tabIndex={2} onClick={this.toggleMenuShow}>User Name</span>
				{
					this.state.showMenu === 'visible' && (
						<ProfileSelect onBlur={this.onProfileSelectBlur}/>
					)
				}
			</div>
		);
	}
	toggleMenuShow(){
		let oldState = this.state.showMenu;
		let isVisibleOrHidden = (oldState === 'hidden');
		let newState = (isVisibleOrHidden) ? 'visible' : 'hidden';
		this.setState({
			showMenu: newState
		});
	}
	onProfileSelectBlur() {
		this.setState({
			showMenu: 'hidden'
		});
	}


}
export default UserName