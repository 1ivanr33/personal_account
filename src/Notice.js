import React from 'react';
import './Notice.scss'

class Notice extends React.Component {
	render() {
		return (
			<div className='notice'>
				<p>
				<span>У вас нет аккаунта?</span><br/><br/>
				<span>Для регистрации в системе ЕИРЦ обратитесь к своему руководителю, у которого есть права на создание заявки новых пользователей</span>
				</p>
			</div>
		);
	}
}
export default Notice