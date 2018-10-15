import React from 'react';
import './UserProfileForm.scss';

class UserProfileForm extends React.Component {
/*
	componentWillMount() {
		console.log("request - " + request);
	}
*/

	render() {
		return (
			<div className='userProfileForm' onScroll={() => console.log('scroll')}>
				<section>
					<h2>Профиль пользователя</h2>
					<h3>Общие данные</h3>
					<p>
						<input disabled id="some11" type="text" value="Иванова"/>
						<label htmlFor="some11" className='textLabel'> Фамилия </label>
					</p>
					<p>
						<input disabled id="some22" type="text" value="Мария"/>
						<label htmlFor="some22" className='textLabel'> Имя </label>
					</p>

					<p>
						<input disabled id="some33" type="text" value="Петровна"/>
						<label htmlFor="some33" className='textLabel'> Отчество </label>
					</p>
					<p>
						<input disabled id="some44" type="text" value="ГБУ «Жилищник Таганский» "/>
						<label htmlFor="some44" className='textLabel'> Компания </label>
					</p>

					<p>
						<input disabled id="some55" type="text" value="Таганский"/>
						<label htmlFor="some55" className='textLabel'> Филиал/Отделение </label>
					</p>
					<p>
						<input disabled id="some66" type="text" value="Менеджер"/>
						<label htmlFor="some66" className='textLabel'> Должность </label>
					</p>

				</section>
				<section>

					<h3>Контактные данные</h3>
					<p>
						<input disabled id="some77" type="text" value="8 888 888 88 88"/>
						<label htmlFor="some77" className='textLabel'> Личный телефон </label>
					</p>
					<p>
						<input disabled id="some88" type="text" value="ivanova@zhilishnik.ru"/>
						<label htmlFor="some88" className='textLabel'> E-mail </label>
					</p>


				</section>
			</div>
		);
	}
}
export default UserProfileForm