import React from 'react';
import { BrowserRouter, Link } from 'react-router-dom';

//import './ProfileSelect.scss'

class ProfileSelect extends React.Component {
	render() {



		return <div className='profileTypeSelect'>
			<Link to="/topics">UserProfile</Link>
			<select>
				<option><Link to="/topics">UserProfile</Link></option>
				<option>some</option>
			</select>
		</div>;
	}
}
export default ProfileSelect