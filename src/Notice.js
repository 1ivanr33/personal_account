import React from 'react';
import './Notice.scss'

class Notice extends React.Component {
	render() {
		//var noticeMain='У вас нет аккаунта? Для регистрации в системе ЕИРЦ обратитесь к своему руководителю, у которого есть права на создание заявки новых пользователей';
		return (
			<div className='notice'>
				{this.props.children}
				<p>
					{this.props.message}
				</p>
			</div>
		);
	}
}
export default Notice