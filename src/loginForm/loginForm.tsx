import React, {ChangeEvent, KeyboardEvent, MouseEvent} from 'react';
import './loginForm.scss';
import Notice from '../Notice';
import FooterNavBar from '../FooterNavBar/FooterNavBar';
import {Link, RouteComponentProps} from 'react-router-dom';
import { inject, observer } from "mobx-react";
import {IMobxProviderInjectedProps} from '../MobxProvider';

interface ILoginFormState {
	Login: string;
	Password: string;
	ShowPassword: string;
	Eye: string;
	Message: string
}

/**
 * RouteComponentProps - добавляет prop history. IMobxProviderInjectedProps - добавляет prop rootStore
 */
@inject("rootStore")
@observer
class LoginForm extends React.Component<RouteComponentProps & IMobxProviderInjectedProps, ILoginFormState> {
	constructor(props: RouteComponentProps & IMobxProviderInjectedProps) {
		super(props);
		this.state = {
			Login: '',
			Password: '',
			ShowPassword: 'password',
			Eye: 'eyeClosed',
			Message: 'У вас нет аккаунта? Для регистрации в системе ЕИРЦ обратитесь к своему руководителю, у которого есть права на создание заявки новых пользователей'
		};

		this.onLoginChange = this.onLoginChange.bind(this);
		this.onPasswordChange = this.onPasswordChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.handleKeyPress = this.handleKeyPress.bind(this);
		this.onEyeMouseOut = this.onEyeMouseOut.bind(this);
	}

	/*onSubmitOld(e){
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
			.then(response => {
				console.log('Success:', JSON.stringify(response))
				this.props.history.push("/home");
			})

			.catch((error) => {
				console.error(error);
			});

		e.preventDefault();
	}*/

	onSubmit() {
        var requestData = {
            Login: this.state.Login,
            Password: this.state.Password
        }

        function makeRequest (method: string, url: string): Promise<XMLHttpRequest> {
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
				const { rootStore } = this.props;
				var respJSON = JSON.parse(response.responseText);
				var errorCode = respJSON.operationResult.ErrorCode;
				if (errorCode === "0") {
					window[rootStore.BrowserStorageType].setItem('securityToken', response.getResponseHeader('Security_Token'));
					console.log('errorCode - ' + errorCode);
					this.props.history.push("/home");
				} else {
					//var errorDescription = respJSON.operationResult.ErrorDescription;
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
	onLoginChange(e: ChangeEvent<HTMLInputElement>) {
		this.setState({Login: e.target.value});
	}

	onPasswordChange(e: ChangeEvent<HTMLInputElement>){
		this.setState({Password: e.target.value});
	}

	handleKeyPress(e: ChangeEvent<KeyboardEvent>) {
		if(e.charCode===13){
			this.onSubmit();
		}
	}

	onPasswordShow = () => {
		let oldState = this.state.ShowPassword;
		let isTextOrHide = (oldState === 'password');
		let newState = (isTextOrHide) ? 'text' : 'password';
		let newEye = (isTextOrHide) ? 'eyeOpen' : 'eyeClosed';

		this.setState({
			ShowPassword: newState,
			Eye: newEye
		});
	}

	onEyeMouseOut() {
		this.setState({
			Eye: 'eyeClosed',
			ShowPassword: 'password'
		})
	}

	OnBrowserStorageTypeChange = event => {
		let newType = (event.currentTarget.checked) ? 'sessionStorage' : 'localStorage';
		const {Store} = this.props;
		Store.BrowserStorageType = newType;
	}

	render() {

		return (

			<div className='loginForm'>
				<div className='loginFormWrapper'>

					<div className='mainFormLogin' onKeyPress={this.handleKeyPress} onSubmit={this.onSubmit}>

						<h3>Вход</h3>
						<p className={this.state.Login ? 'dirty' : ''}>
							<input id="login" type="text" name="login" value={this.state.Login}
								   onChange={this.onLoginChange}/>
							<label htmlFor="login" className='textLabel'> E-mail </label>
						</p>
						<p className={this.state.Password ? 'dirty' : ''}>
							<input id="password" type={this.state.ShowPassword} name="password"
								   value={this.state.Password}
								   onChange={this.onPasswordChange}/>
							<label htmlFor="password" className='textLabel'> Пароль </label>
							<span className={this.state.Eye} onMouseDown={this.onPasswordShow} onMouseUp={this.onPasswordShow} onMouseOut={this.onEyeMouseOut}> </span>
						</p>
						<p className='checkForeign'><input id="foreign" type="checkbox" onChange={this.OnBrowserStorageTypeChange}/><label htmlFor="foreign">Чужой
							компьютер </label><Link to="/PasswordRecovery" className='passwordRecover'>Восстановить пароль</Link></p>
						<p><input type="submit" value="Войти" onClick={this.onSubmit}/></p>
						<p className='alternate'>Вы также можете войти через <a href="">СУДИР</a></p>
						<Notice message={this.state.Message}/>

					</div>

				</div>
				<FooterNavBar/>
			</div>

		);
	}
}

export default LoginForm;