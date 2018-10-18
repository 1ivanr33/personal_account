import React from 'react';
import './UserName.scss'
import BackOpacity from '../ProfileSelect/BackOpacity';
import { Link } from 'react-router-dom';
import { inject, observer } from "mobx-react";

@inject("Store")
@observer
class UserName extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			showMenu: 'hidden'
		};
		this.menuRef = React.createRef();
		this.toggleMenuShow = this.toggleMenuShow.bind(this);
		this.onProfileSelectBlur = this.onProfileSelectBlur.bind(this);
		this.onLinkClick = this.onLinkClick.bind(this);
		this.onBlur = this.onBlur.bind(this);
	}


	toggleMenuShow() {

		let oldState = this.state.showMenu;
		let isVisibleOrHidden = (oldState === 'hidden');
		let newState = (isVisibleOrHidden) ? 'visible' : 'hidden';
		this.setState({
			showMenu: newState
		});
	}

	componentDidUpdate(){
		const { Store } = this.props;
		Store.UserMenuVisible = this.state.showMenu;
	}

	render() {
		const { Store } = this.props;
		let backGroundOpacity = null;
		if (Store.UserMenuVisible === 'visible') {
			backGroundOpacity = <BackOpacity/>;
		}

		return (
			<div>
				<div className='userName' ref={this.menuRef} tabIndex={1} onBlur={this.onBlur} id={this.state.showMenu}>
					<span onClick={this.toggleMenuShow}>Иванова М. П.</span>
					{
						this.state.showMenu === 'visible' && (
							<ul className='profileSelect'>
								<li><Link onClick={this.onLinkClick} to="/UserProfile">Профиль пользователя</Link></li>
								<li><Link onClick={this.onLinkClick} to="/CompanyProfile">Профиль компании</Link></li>
								<li><Link onClick={this.onLinkClick} to="/">Выйти</Link></li>
							</ul>
						)
					}
				</div>
				{backGroundOpacity}
			</div>
		);
	}

	onBlur(event) {
		const wrapperEl = this.menuRef.current;
		if (!(wrapperEl.contains(event.target) && wrapperEl.contains(event.relatedTarget))) {
			this.onProfileSelectBlur();
		}
	}

	onLinkClick() {
		this.setState({
			showMenu: 'hidden' //после тестирования == hidden
		});
	}

	onProfileSelectBlur() {
		this.setState({
			showMenu: 'hidden' //после тестирования == hidden
		});
	}
}
export default UserName