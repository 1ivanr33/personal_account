import React from 'react';
import '../PasswordRecovery/PasswordRecovery.scss';
import FooterNavBar from '../FooterNavBar/FooterNavBar';
import { inject, observer } from "mobx-react";
import { Link } from 'react-router-dom';
import MaskedInput from 'react-text-mask';
import emailMask from 'text-mask-addons/dist/emailMask'

@inject("Store")
@observer
class PasswordRecovery extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			Email: ''
		};
		this.onSubmit = this.onSubmit.bind(this);
		this.onEmailChange = this.onEmailChange.bind(this);
	}

	onSubmitOld(e){
		const url_post = "http://igitb1700000221.hq.corp.mos.ru:7001/war/resources/AdministrationService/getOperatorByLoginParams";

		let requestData = {
			login: this.state.Login,
			password: this.state.Password
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

	onSubmit(e) {
		var requestData = {
			Login: this.state.Login,
			Password: this.state.Password
		}

		const {Store} = this.props;

		function makeRequest (method, url) {
			return new Promise(function (resolve, reject) {
				var xhr = new XMLHttpRequest();

				xhr.open(method, url);
				xhr.setRequestHeader("Content-Type", "application/json");
				////                xhr.send('{"Login":"Andrew","Password":"welcome1"}');
				xhr.send(JSON.stringify(requestData));

				xhr.onload = function () {
					if (this.status === 200) {
						////                         resolve(xhr.response);
						resolve(xhr);
					} else {
						reject({
							status: this.status,
							statusText: xhr.statusText
						});
					}
				};
				xhr.onerror = function () {
					reject({
						status: this.status,
						statusText: xhr.statusText
					});
				};
				//                 xhr.send();
			});
		}

		makeRequest('POST', 'http://igitb1700000221.hq.corp.mos.ru:7001/war/resources/AdministrationService/getOperatorByLoginParams')
		////            .then(response => { console.log('Response - ' + response.responseText); console.log('Security_Token - ' + response.getResponseHeader('Security_Token'));
			.then(response => {
				//				const { Store } = this.props;
				var respJSON = JSON.parse(response.responseText);
				var errorCode = respJSON.operationResult.ErrorCode;
				//            	console.log('Response - ' + response.responseText);
				localStorage.setItem('securityToken', response.getResponseHeader('Security_Token'));
				console.log('Security_Token - ' + Store.SecurityToken);
				if (errorCode === "0") {
					console.log('errorCode - ' + errorCode);
					this.props.history.push("/home");
					Store.IsUserAuthenticated = 'true';
					localStorage.setItem('isUserAuthenticated', Store.IsUserAuthenticated)
				} else {
					var errorDescription = respJSON.operationResult.ErrorDescription;
					if (errorCode == "410") {
						this.setState({Message: 'Не указан логин. Пожалуйста, введите логин'})
					} else if (errorCode == "411") {
						this.setState({Message: 'Не указан пароль. Пожалуйста, введите пароль.'})
					} else if (errorCode == "412" || errorCode == "413") {
						this.setState({Message: 'Пользователь с заданным логином или паролем не найден. Пожалуйста, проверьте правильность написания логина или пароля.'})
					}
				}
			})
			.catch(function (err) {
				console.error('Augh, there was an error!', err.statusText);
			});
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

			<div className='passwordRecovery'>
				<div className='passwordRecoveryWrapper'>

					<div className='mainFormPasswordRecovery' onKeyPress={this.handleKeyPress} onSubmit={this.onSubmit}>

						<h3>Восстановление пароля</h3>
						<p>
							Введите e-mail, который вы указывали при регистрации. Мы отправим вам письмо с инструкцией по восстановлению пароля
						</p>
						<p className={this.state.Email ? 'dirty' : ''}>
							<MaskedInput mask={emailMask} id="login" type="text" name="login" value={this.state.Login}
								   onChange={this.onEmailChange}/>
							<label htmlFor="login" className='textLabel'> E-mail </label>
						</p>


						<p><input type="submit" value="Восстановить пароль" onClick={this.onSubmit}/></p>
						<p className='alternate'><Link to="/">Я вспомнил пароль</Link></p>

					</div>

				</div>
				<FooterNavBar/>
			</div>

		);
	}
}

export default PasswordRecovery;
