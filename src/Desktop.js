import React from 'react';
import './Desktop.scss';

class Desktop extends React.Component {
	render() {

		return (
			<div className='desktop'>

				{this.props.children}
			</div>
		);
	}
}
export default Desktop