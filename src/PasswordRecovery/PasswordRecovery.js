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
