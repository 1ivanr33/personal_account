import React from 'react';
import './FooterNavBar.scss'

class FooterNavBar extends React.Component {
	render() {


		return <div className='footerMenu'>
			<p>
				<a id='dit' href=" ">ДИТ </a>
				<a id='logoProstor' href=" "> </a>
				<a id='help' href=" ">Помощь </a>
			</p>
		</div>;
	}
}
export default FooterNavBar