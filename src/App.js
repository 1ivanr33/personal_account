import React from 'react';
import './App.css';

class LoginForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {login: '', password: ''};

		this.onLoginChange = this.onLoginChange.bind(this);
		this.onPasswordChange = this.onPasswordChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	onSubmit(e){
		const url_post = "https://fb2e2d1a-3b6a-488f-8ab5-68cdb5b2e5c7.mock.pstmn.io/war/resources/AdministrationService/createUser";

		let requestData = {
			login: this.state.login,
			password: this.state.password
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

	onPasswordChange(e){
		this.setState({password: e.target.value});
	}

	onLoginChange(e) {
		this.setState({login: e.target.value});
	}

	render() {
		return (
			<form onSubmit={this.onSubmit}>
				<p><label> Логин: <input type="text" name="login" value={this.state.login}
										 onChange={this.onLoginChange}/></label></p>
				<p><label> Пароль: <input type="password" name="password" value={this.state.password}
										  onChange={this.onPasswordChange}/></label></p>
				<p><input type="submit" value="Submit" onClick={this.onSubmit}/></p>
			</form>
		);
	}
}

export default LoginForm;
