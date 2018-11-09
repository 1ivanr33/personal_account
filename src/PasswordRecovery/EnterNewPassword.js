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
			Email: ''
		};
		this.resendRef = React.createRef();
		this.onSubmit = this.onSubmit.bind(this);
		this.onEmailChange = this.onEmailChange.bind(this);
	}

	onSubmit(e){
		const url_post = "http://igitb1700000221.hq.corp.mos.ru:7001/war/resources/AdministrationService/getOperatorByLoginParams";

		let requestData = {
			email: this.state.Email
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

	onEmailChange(e) {
		this.setState({Email: e.target.value});
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
						<p className={this.state.Email ? 'dirty' : ''}>
							<MaskedInput mask={emailMask} id="login" type="text" name="login" value={this.state.Login}
										 onChange={this.onEmailChange}/>
							<label htmlFor="login" className='textLabel'> Новый пароль </label>
						</p>


						<p className={this.state.Email ? 'dirty' : ''}>
							<MaskedInput mask={emailMask} id="login" type="text" name="login" value={this.state.Login}
										 onChange={this.onEmailChange}/>
							<label htmlFor="login" className='textLabel'> Повторите пароль </label>
						</p>
						<p className='savePassword'><input type="submit" value="Сохранить пароль" onClick={this.onSubmit}/></p>
						<Notice>

							<h4>Для вашей безопасности</h4>
							<p>Пароль должен быть длиннее 4 символов</p>
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