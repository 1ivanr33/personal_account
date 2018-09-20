import React from 'react';

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

		return <div>{navLinks}</div>;
	}
}
export default FooterNavBar