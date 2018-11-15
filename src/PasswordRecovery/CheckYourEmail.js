import React from 'react';
import './CheckYourEmail.scss';
import Notice from '../Notice';
import FooterNavBar from '../FooterNavBar/FooterNavBar';
import { Link } from 'react-router-dom';
import { inject, observer } from "mobx-react";
import MaskedInput from 'react-text-mask';
import emailMask from 'text-mask-addons/dist/emailMask';

@inject("Store")
@observer
class CheckYourEmail extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			Email: ''
		};
		this.resendRef = React.createRef();
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
				} else {
					this.props.history.push("/UserNotFound");
				}
			})
			.catch((err) => {
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

			<div className='checkYourEmail'>
				<div className='checkYourEmailWrapper'>

					<div className='mainFormCheckYourEmail' onKeyPress={this.handleKeyPress} onSubmit={this.onSubmit}>

						<h3>Проверьте ваш e-mail</h3>
						<p>
							Мы отправили инструкцию	по восстановлению пароля на вашу почту
						</p>
						<p className={this.state.Email ? 'dirty' : ''}>
							<MaskedInput mask={emailMask} id="login" type="text" name="login" value={this.state.Login}
										 onChange={this.onEmailChange}/>
							<label htmlFor="login" className='textLabel'> E-mail </label>
						</p>


						<p className='resendBtn' ref={this.resendRef} onClick={this.onSubmit}><span>Отправить еще раз</span></p>
						<p className='alternate'><Link to="/">Я вспомнил пароль</Link></p>
						<Notice>

							<h4>Не приходит письмо?</h4>
							<p>Получение письма может занимать несколько минут.	Если письмо не пришло — проверьте папку «спам».</p>
							<p>Если вы не обнаружили письмо, повторите отправку.</p>

						</Notice>
					</div>

				</div>
				<FooterNavBar/>
			</div>

		);
	}
}

export default CheckYourEmail;