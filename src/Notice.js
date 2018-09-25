import React from 'react';
import './Notice.scss'

class Notice extends React.Component {
	render() {
		return (
			<div className='notice'>
				<p>У вас нет аккаунта?</p>
				<p>Для регистрации в системе ЕИРЦ обратитесь к своему руководителю</p>
			</div>
		);
	}
}
export default Notice