/*
Совмещен с UserName


import React from 'react';
import './ProfileSelect.scss';
import { BrowserRouter, Link } from 'react-router-dom';

class ProfileSelect extends React.Component {

	constructor(props) {
		super(props);
		this.menuRef = React.createRef();
		this.onBlur = this.onBlur.bind(this);
		this.onLinkClick = this.onLinkClick.bind(this);
	}

	componentDidMount() {
		this.menuRef.current.focus();
	}

	render() {
		return (
			<ul className='profileSelect' ref={this.menuRef} tabIndex={1} onBlur={this.onBlur}>
				<li><Link onClick={this.onLinkClick} to="/UserProfile">Профиль пользователя</Link></li>
				<li><Link onClick={this.onLinkClick} to="/CompanyProfile">Профиль компании</Link></li>
				<li><Link onClick={this.onLinkClick} to="/">Выйти</Link></li>
			</ul>
		);
	}

	onBlur(event) {
		if ('onBlur' in this.props) {
			const wrapperEl = this.menuRef.current;
			if (!(wrapperEl.contains(event.target) && wrapperEl.contains(event.relatedTarget))) {
				this.props.onBlur(event);
			}
		}
	}

	onLinkClick(event) {
		this.props.onLinkClick();
	}

}
export default ProfileSelect*/
