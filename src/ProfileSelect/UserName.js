import React from 'react';
import ProfileSelect from './ProfileSelect';
import './UserName.scss'

class UserName extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			showMenu: 'hidden'
		};
		this.toggleMenuShow = this.toggleMenuShow.bind(this);
		this.onProfileSelectBlur = this.onProfileSelectBlur.bind(this);
		this.onLinkClick = this.onLinkClick.bind(this);
	}

	toggleMenuShow(){
		let oldState = this.state.showMenu;
		let isVisibleOrHidden = (oldState === 'hidden');
		let newState = (isVisibleOrHidden) ? 'visible' : 'hidden';
		this.setState({
			showMenu: newState
		});
	}

	render() {
		return (
			<div className='userName' tabIndex={1} id={this.state.showMenu}>
				<span onClick={this.toggleMenuShow}>User Name</span>
				{
					this.state.showMenu === 'visible' && (
						<ProfileSelect
							onLinkClick={this.onLinkClick}
							onBlur={this.onProfileSelectBlur}
						/>
					)
				}
			</div>
		);
	}

	onLinkClick() {
		this.setState({
			showMenu: 'visible' //после тестирования == hidden
		});
	}

	onProfileSelectBlur() {
		this.setState({
			showMenu: 'visible' //после тестирования == hidden
		});
	}
}
export default UserName