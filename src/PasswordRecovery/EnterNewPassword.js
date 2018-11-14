import React from 'react';
import './EnterNewPassword.scss';
import Notice from '../Notice';
import FooterNavBar from '../FooterNavBar/FooterNavBar';
import { Link } from 'react-router-dom';
import { inject, observer } from "mobx-react";
import MaskedInput from 'react-text-mask';
import emailMask from 'text-mask-addons/dist/emailMask';

@inject("Store")
@observer
class EnterNewPassword extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			password1: '',
			password2: ''
		};
		this.onSubmit = this.onSubmit.bind(this);
		this.onPasswordOneChange = this.onPasswordOneChange.bind(this);
		this.onPasswordTwoChange = this.onPasswordTwoChange.bind(this);
		this.handleKeyPress = this.handleKeyPress.bind(this);
	}

	onSubmit(e){
		const url_post = "http://igitb1700000221.hq.corp.mos.ru:7001/war/resources/AdministrationService/getOperatorByLoginParams";

		let requestData = {
			password: this.state.password2
		}

		let postData = {
			method: 'POST',
			body: JSON.stringify(requestData),
			headers:{
				'Content-Type': 'application/json'
			}
		}

		fetch(url_post, postData).then(res => res.json())
			.then(response => {
				console.log('Success:', JSON.stringify(response))
				this.props.history.push("/home");
			})

			.catch((error) => {
				console.error(error);
			});

		e.preventDefault();
	}

	onPasswordOneChange(e) {
		let passwordOne = e.target.value;
		let res = /\W/gi;
		if (res.test(passwordOne)){
			passwordOne = passwordOne.replace(res, '')
		}
		this.setState({password1: passwordOne});
	}
	onPasswordTwoChange(e) {
		this.setState({password2: e.target.value});
	}

	handleKeyPress(target) {
		if(target.charCode===13){
			this.onSubmit();
		}
	}


	render() {

		return (

			<div className='enterNewPassword'>
				<div className='enterNewPasswordWrapper'>

					<div className='mainFormEnterNewPassword' onKeyPress={this.handleKeyPress} onSubmit={this.onSubmit}>

						<h3>Введите новый пароль</h3>
						<p>
							Ваш пароль успешно сброшен.	Придумайте новый пароль для авторизации
						</p>
						<p className={this.state.password1 ? 'dirty' : ''}>
							<input minLength='6' maxLength='16' id="password1" type="text" name="login" value={this.state.password1}
										 onChange={this.onPasswordOneChange}/>
							<label htmlFor="password1" className='textLabel'> Новый пароль </label>
						</p>


						<p className={this.state.password2 ? 'dirty' : ''}>
							<input minLength='6' maxLength='16' id="password2" type="text" name="login" value={this.state.password2}
										 onChange={this.onPasswordTwoChange}/>
							<label htmlFor="password2" className='textLabel'> Повторите пароль </label>
						</p>
						<p className='savePassword'><input type="submit" value="Сохранить пароль" onClick={this.onSubmit}/></p>
						<Notice>

							<h4>Для вашей безопасности</h4>
							<p>Пароль должен быть длиннее 6 символов</p>
							<p>Используйте в пароле одну заглавную букву и одну цифру</p>

						</Notice>
					</div>

				</div>
				<FooterNavBar/>
			</div>

		);
	}
}

export default EnterNewPassword;