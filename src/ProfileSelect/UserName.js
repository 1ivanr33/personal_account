import React from 'react';
import './UserName.scss'
import { BrowserRouter, Link } from 'react-router-dom';
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
		const { Store } = this.props;
		let oldState = this.state.showMenu;
		let isVisibleOrHidden = (oldState === 'hidden');
		let newState = (isVisibleOrHidden) ? 'visible' : 'hidden';
		this.setState({
			showMenu: newState
		});
		Store.UserNameVisible = this.state.showMenu;
	}



	render() {
		return (
			<div className='userName' ref={this.menuRef} tabIndex={1} onBlur={this.onBlur} id={this.state.showMenu}>
				<span onClick={this.toggleMenuShow}>Иванова М. П.</span>
				{
					this.state.showMenu === 'visible' && (
						<ul className='profileSelect' >
							<li><Link onClick={this.onLinkClick} to="/UserProfile">Профиль пользователя</Link></li>
							<li><Link onClick={this.onLinkClick} to="/CompanyProfile">Профиль компании</Link></li>
							<li><Link onClick={this.onLinkClick} to="/">Выйти</Link></li>
						</ul>
					)
				}
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