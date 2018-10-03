import React from 'react';
import './ProfileSelect.scss'
import { BrowserRouter, Link } from 'react-router-dom';


//import './ProfileSelect.scss'

class ProfileSelect extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			showMenu: 'hidden'
		};

		this.userShow = this.userShow.bind(this);
		this.userHide = this.userHide.bind(this);
		this.menuRef = React.createRef();
	}


	userShow() {
		this.setState({ showMenu: 'visible' });

		console.log(this.menuRef.current);
	}


	userHide() {
		this.setState({ showMenu: 'hidden' });
	}

	componentDidUpdate() {
		if (this.state.showMenu === 'visible') {
			this.menuRef.current.focus();
		}
	}


	render() {


		return <div id='selectProfile' className={this.state.showMenu}>
			<p>
				<span onClick={this.userShow}  >User Name</span>
				<ul tabindex="1" onBlur={this.userHide} ref={this.menuRef}>
					<li><Link onClick={this.userHide} to="/UserProfile">Профиль пользователя</Link></li>
					<li><Link to="/CompanyProfile">Профиль компании</Link></li>
					<li><Link to="/">Выйти из ЕИРЦ</Link></li>
				</ul>
			</p>
		</div>;
	}
}
export default ProfileSelect