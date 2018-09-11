import React/*, { Component }*/ from 'react';
//import logo from './logo.svg';
import './App.css';

export class LoginFormComponent extends React.Component {


	render() {
		return (
			<form onSubmit={this.onSubmit}>
				<p><label> Логин: <input type="text" name="login" value={this.props.login}
										 onChange={this.onLoginChange}/></label></p>
				<p><label> Пароль: <input type="password" name="password" value={this.props.password}
										  onChange={this.onPasswordChange}/></label></p>
				<p><input type="submit" value="Submit" onClick={() => { this.props.updateUserData(this.state.login)}}/></p>
			</form>
		);
	}
}


