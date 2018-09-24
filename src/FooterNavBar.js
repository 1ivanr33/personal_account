import React from 'react';
import './FooterNavBar.scss'

class FooterNavBar extends React.Component {
	render() {
		const pages = ['home', 'about', 'contact'];
		const navLinks = pages.map(page => {
			return (
				<a href={'/' + page}>
					{page}
				</a>
			)
		});

		return <div className='footerMenu'>{navLinks}</div>;
	}
}
export default FooterNavBar