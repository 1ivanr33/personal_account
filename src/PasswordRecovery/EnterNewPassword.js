import React from 'react';
import './EnterNewPassword.scss';
import Notice from '../Notice';
import FooterNavBar from '../FooterNavBar/FooterNavBar';
//import { Link } from 'react-router-dom';
import { inject, observer } from "mobx-react";

@inject("Store")
@observer
class EnterNewPassword extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			password1: '',
			password2: '',
			passwordError: 'hidden',
			showPassword1: 'password',
			showPassword2: 'password',
			EyeOne: 'eyeClosed',
			EyeTwo: 'eyeClosed',
			passwordErrorMessage: ''
		};
		this.onSubmit = this.onSubmit.bind(this);
		this.onPasswordOneChange = this.onPasswordOneChange.bind(this);
		this.onPasswordTwoChange = this.onPasswordTwoChange.bind(this);
		this.handleKeyPress = this.handleKeyPress.bind(this);
		this.onPasswordShowOne = this.onPasswordShowOne.bind(this);
		this.onPasswordShowTwo = this.onPasswordShowTwo.bind(this);
		this.onEyeMouseOutOne = this.onEyeMouseOutOne.bind(this);
		this.onEyeMouseOutTwo = this.onEyeMouseOutTwo.bind(this);
	}

	onSubmit(e){
		const url_post = "http://igitb1700000221.hq.corp.mos.ru:7001/war/resources/AdministrationService/putUserNewPasswordByCode";

		let requestData = {
			code: this.props.match.params.id,
			password: this.state.password2
		}

		let postData = {
			method: 'POST',
			body: JSON.stringify(requestData),
			headers:{
				'Content-Type': 'application/json'
			}
		}

		if (this.state.password1.length < 6 && this.state.password2.length < 6) {
			console.log('Пароль не должен быть короче 6 символов');
			this.setState({passwordError: '', passwordErrorMessage: 'Пароль не должен быть короче 6 символов'});
		}

		else if (this.state.password1 !== this.state.password2) {
			console.log('Пароли не совпадают');
			this.setState({passwordError: '', passwordErrorMessage: 'Пароли не совпадают'});
		}

		else {
			fetch(url_post, postData).then(res => res.json())
				.then(response => {
					console.log('Success:', JSON.stringify(response));
					console.log('Пароль успешно сохранен');
					this.props.history.push('/home');
				})

				.catch((error) => {
					console.error(error);
				});
		}
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
		let passwordTwo = e.target.value;
		let res = /\W/gi;
		if (res.test(passwordTwo)){
			passwordTwo = passwordTwo.replace(res, '')
		}
		this.setState({password2: passwordTwo});
	}

	handleKeyPress(target) {
		if(target.charCode===13){
			this.onSubmit();
		}
	}

	onPasswordShowOne(e){
		let oldState = this.state.showPassword1;
		let isTextOrHide = (oldState === 'password');
		let newState = (isTextOrHide) ? 'text' : 'password';
		let newEye = (isTextOrHide) ? 'eyeOpen' : 'eyeClosed';

		this.setState({
			showPassword1: newState,
			EyeOne: newEye
		});
	}

	onPasswordShowTwo(e){
		let oldState = this.state.showPassword2;
		let isTextOrHide = (oldState === 'password');
		let newState = (isTextOrHide) ? 'text' : 'password';
		let newEye = (isTextOrHide) ? 'eyeOpen' : 'eyeClosed';

		this.setState({
			showPassword2: newState,
			EyeTwo: newEye
		});
	}

	onEyeMouseOutOne() {
		this.setState({
			EyeOne: 'eyeClosed',
			showPassword1: 'password'
		})
	}
	onEyeMouseOutTwo() {
		this.setState({
			EyeTwo: 'eyeClosed',
			showPassword2: 'password'
		})
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
							<input maxLength='16' id="password1" type={this.state.showPassword1} value={this.state.password1}
										 onChange={this.onPasswordOneChange}/>
							<label htmlFor="password1" className='textLabel'> Новый пароль </label>
							<span className={this.state.EyeOne} onMouseDown={this.onPasswordShowOne} onMouseUp={this.onPasswordShowOne} onMouseOut={this.onEyeMouseOutOne}> </span>
						</p>


						<p className={this.state.password2 ? 'dirty' : ''}>
							<input maxLength='16' id='password2' type={this.state.showPassword2} value={this.state.password2}
										 onChange={this.onPasswordTwoChange}/>
							<label htmlFor="password2" className='textLabel'> Повторите пароль </label>
							<span className={this.state.EyeTwo} onMouseDown={this.onPasswordShowTwo} onMouseUp={this.onPasswordShowTwo} onMouseOut={this.onEyeMouseOutTwo}> </span>
						</p>

						<p className={'passwordSyntaxError ' + this.state.passwordError}>
							<span>{this.state.passwordErrorMessage}</span>
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