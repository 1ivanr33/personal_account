import React from 'react';
import './loginForm.scss';

class LoginForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			Login: '',
			Password: ''
		};

		this.onLoginChange = this.onLoginChange.bind(this);
		this.onPasswordChange = this.onPasswordChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	onSubmit(e){
		const url_post = "http://10.82.186.67:7001/war/resources/AdministrationService/getOperatorByLoginParams";

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
			.then(response => console.log('Success:', JSON.stringify(response)))

			.catch((error) => {
				console.error(error);
			});

		e.preventDefault();
	}


	onLoginChange(e) {
		this.setState({Login: e.target.value});
	}

	onPasswordChange(e){
		this.setState({Password: e.target.value});
	}


	render() {



		return (



			<form onSubmit={this.onSubmit}>
				<h3>Вход</h3>
				<p className={this.state.Login ? 'dirty' : ''}><input id="login" type="text" name="login" value={this.state.Login}
										 onChange={this.onLoginChange}/><label for="login" className='textLabel'> E-mail или СНИЛС </label></p>
				<p className={this.state.Password ? 'dirty' : ''}><input id="password" type="password" name="password" value={this.state.Password}
										  onChange={this.onPasswordChange}/><label for="password" className='textLabel'> Пароль </label></p>
				<p><input id="foreign" type="checkbox"/><label for="foreign">Чужой компьютер </label><span className='passwordRecover'>Восстановить пароль</span> </p>
				<p><input type="submit" value="Войти" onClick={this.onSubmit}/></p>
			</form>


		);
	}
}

export default LoginForm;
