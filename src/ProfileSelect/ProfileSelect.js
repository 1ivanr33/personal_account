import React from 'react';
import './ProfileSelect.scss';
//import UserName from './UserName';
import { BrowserRouter, Link } from 'react-router-dom';


//import './ProfileSelect.scss'

class ProfileSelect extends React.Component {

	render() {


		return <div className={this.props.show}>

			{/*<UserName onClick={this.userShow} show={this.state.showMenu}/>*/}

				<ul>
					<li><Link  to="/UserProfile">Профиль пользователя</Link></li>
					<li><Link to="/CompanyProfile">Профиль компании</Link></li>
					<li><Link to="/">Выйти из ЕИРЦ</Link></li>
				</ul>

		</div>;
	}
}
export default ProfileSelect