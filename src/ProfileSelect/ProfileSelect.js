import React from 'react';
import './ProfileSelect.scss';
//import UserName from './UserName';
import { BrowserRouter, Link } from 'react-router-dom';


//import './ProfileSelect.scss'

class ProfileSelect extends React.Component {

	constructor(props) {
		super(props);
		this.menuRef = React.createRef();
		this.onBlur = this.onBlur.bind(this);
	}


	componentDidMount() {
		this.menuRef.current.focus();
	}


	render() {
		return (
				<ul ref={this.menuRef} tabIndex={1} onBlur={this.onBlur}>
					<li><Link onClick={this.onBlur} to="/UserProfile">Профиль пользователя</Link></li>
					<li><Link onClick={this.onBlur} to="/CompanyProfile">Профиль компании</Link></li>
					<li><Link to="/">Выйти из ЕИРЦ</Link></li>
				</ul>
		);
	}

	onBlur(event) {
		const wrapperEl = this.menuRef.current;
		if (!(wrapperEl.contains(event.target) && wrapperEl.contains(event.relatedTarget))) {
			this.props.onBlur();
		}
	}

}
export default ProfileSelect