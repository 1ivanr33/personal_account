import React, {ChangeEvent, KeyboardEvent} from 'react';
import './UserNotFound.scss';
import Notice from '../Notice';
import FooterNavBar from '../FooterNavBar/FooterNavBar';
import {Link, RouteComponentProps} from 'react-router-dom';
import { inject, observer } from "mobx-react";
import MaskedInput from 'react-text-mask';
import emailMask from 'text-mask-addons/dist/emailMask';

interface IUserNotFoundState {
	Email: string;
}

@inject("Store")
@observer
class UserNotFound extends React.Component<RouteComponentProps, IUserNotFoundState> {
	constructor(props: RouteComponentProps) {
		super(props);
		this.state = {
			Email: ''
		};
		this.onSubmit = this.onSubmit.bind(this);
		this.onEmailChange = this.onEmailChange.bind(this);
		this.handleKeyPress = this.handleKeyPress.bind(this);
	}

	onSubmit(){
		const url_post = "http://igitb1700000221.hq.corp.mos.ru:7001/war/resources/AdministrationService/putUserGenerateCodeByEmail";

		const requestData = {
			email: this.state.Email
		};

		const postData = {
			method: 'POST',
			body: JSON.stringify(requestData),
			headers:{
				'Content-Type': 'application/json'
			}
		};

		fetch(url_post, postData)
			.then(response => {
				return response.json();
			})
			.then(data => {
				let emailStatus = data.operationResult.ErrorCode;
				console.log(emailStatus);
				if (emailStatus === "0") {
					console.log('errorCode - ' + emailStatus);
					this.props.history.push("/CheckYourEmail");
				} else {
					this.props.history.push("/UserNotFound");
				}
			})
			.catch((err) => {
				console.error('Augh, there was an error!', err.statusText);
			});
	}

	onEmailChange(e: ChangeEvent<HTMLInputElement>) {
		this.setState({Email: e.target.value});
	}

	handleKeyPress(target: KeyboardEvent<HTMLDivElement>) {
		if(target.charCode===13){
			this.onSubmit();
		}
	}


	render() {

		return (

			<div className='userNotFound'>
				<div className='userNotFoundWrapper'>

					<div className='mainFormUserNotFound' onKeyPress={this.handleKeyPress} onSubmit={this.onSubmit}>

						<h3>Восстановление пароля</h3>
						<p>
							Введите e-mail, который вы указывали при регистрации. Мы отправим вам письмо с инструкцией по восстановлению пароля
						</p>
						<p className={this.state.Email ? 'dirty' : ''}>
							<MaskedInput mask={emailMask} id="login" type="text" name="login" value={this.state.Email}
										 onChange={this.onEmailChange}/>
							<label htmlFor="login" className='textLabel'> E-mail </label>
						</p>


						<p className='recoverPasswordBtn'><input type="submit" value="Восстановить пароль" onClick={this.onSubmit}/></p>
						<p className='alternate'><Link to="/">Я вспомнил пароль</Link></p>
						<Notice>

							<h4>Пользователь не найден</h4>
							<p>Извините, но мы не нашли	пользователя. Проверьте правильность написания логина и повторите попытку.</p>
							<p>Если у вас возникли проблемы с авторизацией, вы можете <a href=' '>задать вопрос в техничскую поддержку</a></p>

						</Notice>
					</div>

				</div>
				<FooterNavBar/>
			</div>

		);
	}
}

export default UserNotFound;