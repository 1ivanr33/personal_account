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
		this.userHide = this.userHide.bind(this);
		this.menuRef = React.createRef();
	}

	toggleMenuShow(){
		let oldState = this.state.showMenu;
		let isVisibleOrHidden = (oldState === 'hidden');
		let newState = (isVisibleOrHidden) ? 'visible' : 'hidden';


		this.setState({
			showMenu: newState,

		});
	}

	userHide() {
		this.setState({ showMenu: 'hidden' });
	}

	componentDidUpdate() {
		if (this.state.showMenu === 'visible') {
			//this.menuRef.current.focus();
		}
	}

	/*userShow() {
		this.setState({ showMenu: 'visible' });

		console.log(this.menuRef.current);
	}*/


	render() {

		return (
			<div tabindex="1" className='userName' onBlur={this.userHide}>
			<span onClick={this.toggleMenuShow}>User Name</span>
			<ProfileSelect ref={this.menuRef}  show={this.state.showMenu} />
				</div>
		);
	}
}
export default UserName