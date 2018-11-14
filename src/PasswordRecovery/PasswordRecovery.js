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

		/*(async function() {
			const response = await fetch(url_post, postData);
			const data = await response.json();
		})();*/

	}

	/*onSubmitXhr(e) {
		let requestData = {
			email: this.state.Email
		};

		function makeRequest (method, url) {
			return new Promise(function (resolve, reject) {
				var xhr = new XMLHttpRequest();

				xhr.open(method, url);
				xhr.setRequestHeader("Content-Type", "application/json");
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

		makeRequest('POST', 'http://igitb1700000221.hq.corp.mos.ru:7001/war/resources/AdministrationService/putUserGenerateCodeByEmail')
			.then(response => {
				var respJSON = JSON.parse(response.responseText);
				var errorCode = respJSON.operationResult.ErrorCode;
				//            	console.log('Response - ' + response.responseText);
				if (errorCode === "0") {
					console.log('errorCode - ' + errorCode);
					this.props.history.push("/CheckYourEmail");
				} else {
					this.props.history.push("/UserNotFound");
				}
			})
			.catch(function (err) {
				console.error('Augh, there was an error!', err.statusText);
			});
	}*/

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


						<p className='recoverPasswordBtn'><input type="submit" value="Восстановить пароль" onClick={this.onSubmit}/></p>
						<p className='alternate'><Link to="/">Я вспомнил пароль</Link></p>

					</div>

				</div>
				<FooterNavBar/>
			</div>

		);
	}
}

export default PasswordRecovery;
