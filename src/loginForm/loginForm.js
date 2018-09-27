import React from 'react';
import './loginForm.scss';
import Notice from '../Notice';

class LoginForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			Login: '',
			Password: '',
			Message: 'У вас нет аккаунта? Для регистрации в системе ЕИРЦ обратитесь к своему руководителю, у которого есть права на создание заявки новых пользователей'
		};

		this.onLoginChange = this.onLoginChange.bind(this);
		this.onPasswordChange = this.onPasswordChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	onSubmitOld(e){
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
	}

    onSubmit(e) {
        var requestData = {
            Login: this.state.Login,
            Password: this.state.Password
        }

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
				var respJSON = JSON.parse(response.responseText);
				var errorCode = respJSON.operationResult.ErrorCode;
				//            	console.log('Response - ' + response.responseText);
				console.log('Security_Token - ' + response.getResponseHeader('Security_Token'));
				if (errorCode == 0) {
					console.log('errorCode - ' + errorCode);
					this.props.history.push("/home");
				} else {
					var errorDescription = respJSON.operationResult.ErrorDescription;
					if (errorCode == 410) {
						this.setState({Message: 'Не указан логин. Пожалуйста, введите логин'})
					} else if (errorCode == 411) {
						this.setState({Message: 'Не указан пароль. Пожалуйста, введите пароль.'})
					} else if (errorCode == 412 || errorCode == 413) {
						this.setState({Message: 'Пользователь с заданным логином или паролем не найден. Пожалуйста, проверьте правильность написания логина или пароля.'})
					}
				}
			})
			.catch(function (err) {
				console.error('Augh, there was an error!', err.statusText);
			});

    }
	onLoginChange(e) {
		this.setState({Login: e.target.value});
	}

	onPasswordChange(e){
		this.setState({Password: e.target.value});
	}


	render() {



		return (



			<div className='formLogin' onSubmit={this.onSubmit}>
				<h3>Вход</h3>
				<p className={this.state.Login ? 'dirty' : ''}><input id="login" type="text" name="login" value={this.state.Login}
										 onChange={this.onLoginChange}/><label for="login" className='textLabel'> E-mail или СНИЛС </label></p>
				<p className={this.state.Password ? 'dirty' : ''}><input id="password" type="password" name="password" value={this.state.Password}
										  onChange={this.onPasswordChange}/><label for="password" className='textLabel'> Пароль </label></p>
				<p className='checkForeign'><input id="foreign" type="checkbox"/><label for="foreign">Чужой компьютер </label><span className='passwordRecover'>Восстановить пароль</span> </p>
				<p><input type="submit" value="Войти" onClick={this.onSubmit}/></p>
				<p className='alternate'>Вы также можете войти через <a href="#">СУДИР</a></p>
				<Notice message={this.state.Message}/>
			</div>


		);
	}
}

export default LoginForm;
