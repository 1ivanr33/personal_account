import React from 'react';
import './CompanyProfileForm.scss';

class CompanyProfileForm extends React.Component {
	/*componentDidMount = async () => {
		// await
		console.log('111');
	}*/

	render() {
		//this.props.Store.
		return (
			<div className='companyProfileForm' onScroll={() => console.log('scroll')}>
				<section>
					<h2>Профиль компании</h2>
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

				<section>

					<h3>Банковские счета</h3>
					<p>
						<input disabled id="some99" type="text" value="ПАО «ВТБ24»"/>
						<label htmlFor="some99" className='textLabel'> Банк </label>
					</p>
					<p>
						<input disabled id="some111" type="text" value="Основной счет для проведения всех платежных транзакций"/>
						<label htmlFor="some111" className='textLabel'> Комментарий </label>
					</p>
					<p>
						<input disabled id="some222" type="text" value="0000000000"/>
						<label htmlFor="some222" className='textLabel'> SWIFT </label>
					</p>
					<p>
						<input disabled id="some333" type="text" value="00000000000"/>
						<label htmlFor="some333" className='textLabel'> БИК </label>
					</p>
				</section>
			</div>
		);
	}
}
export default CompanyProfileForm