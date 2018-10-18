import React from 'react';
import './UserProfileForm.scss';
import { inject, observer } from "mobx-react";

@inject("Store")
@observer
class UserProfileForm extends React.Component {
    constructor() {
        super();

        console.log('This happens 1st.');

        this.state = {
            loading: 'initial',
            data: ''
        };

        this.firstName = '';

        this.userInfo = {
            firstName: '',
            lastName: '',
            surName: '',
            companyName: '',
            subOrgName: '',
            phone: '',
            email: ''
        };
    }

    makeRequest(method, url) {
        var promise = new Promise((resolve, reject) => {
///            setTimeout(() => {
                const {Store} = this.props;
                console.log('Store.SecurityToken - ' + Store.SecurityToken);

                var xhr = new XMLHttpRequest();

                xhr.open(method, url);
                xhr.setRequestHeader("Content-Type", "application/json");

                let requestData = {
                    token: Store.SecurityToken
                }

                xhr.send(JSON.stringify(requestData));

                xhr.onload = function () {
                    if (this.status === 200) {
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
///            }, 10000);
        });

        console.log('This happens 4th.');

        return promise;
    }

    componentDidMount() {

        console.log('This happens 3rd.');

        this.setState({ loading: 'true' });

        this.makeRequest('POST', 'http://igitb1700000221.hq.corp.mos.ru:7001/war/resources/AdministrationService/getCurrentUserInfo')
            .then(response => {
                var respJSON = JSON.parse(response.responseText);
                console.log('respJSON - ' + respJSON.operationResult);

                var errorCode = respJSON.operationResult.ErrorCode;
                console.log('Response - ' + response.responseText);
                if (errorCode === "0") {
                    console.log('errorCode - ' + errorCode);
                    var userInfo = respJSON.userInfo;
                    this.firstName = userInfo.firstName;

                    this.userInfo.firstName = userInfo.firstName;
                    this.userInfo.lastName = userInfo.surname;
                    this.userInfo.surName = userInfo.parentName;
                    this.userInfo.companyName = userInfo.company;
                    this.userInfo.subOrgName = userInfo.subOrg;
                    this.userInfo.phone = userInfo.phone;
                    this.userInfo.email = userInfo.email;

                        console.log('firstName - ' + this.firstName);
//                    this.props.history.push("/home");
//                    Store.UserNameVisible = true;
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
                this.setState({ loading: 'false' });
            })
            .catch(function (err) {
                console.error('Augh, there was an error!', err.statusText);
            });
    }

    render() {

        if (this.state.loading === 'initial') {
            console.log('This happens 2nd - after the class is constructed. You will not see this element because React is still computing changes to the DOM.');
            return <h2>Intializing...</h2>;
        }


        if (this.state.loading === 'true') {
            console.log('This happens 5th - when waiting for data.');
            return <h2>Loading...</h2>;
        }

        console.log('This happens 8th - after I get data.');
        return (
            <div className='userProfileForm' onScroll={() => console.log('scroll')}>
                <section>
                    <h2>Профиль пользователя</h2>
                    <h3>Общие данные</h3>
                    <p>
                        <input disabled id="some11" type="text" value={this.userInfo.lastName}/>
                        <label htmlFor="some11" className='textLabel'> Фамилия </label>
                    </p>
                    <p>
                        <input disabled id="some22" type="text" value={this.userInfo.firstName}/>
                        <label htmlFor="some22" className='textLabel'> Имя </label>
                    </p>

                    <p>
                        <input disabled id="some33" type="text" value={this.userInfo.surName}/>
                        <label htmlFor="some33" className='textLabel'> Отчество </label>
                    </p>
                    <p>
                        <input disabled id="some44" type="text" value="ГБУ «Жилищник Таганский» "/>
                        <label htmlFor="some44" className='textLabel'> {this.userInfo.companyName} </label>
                    </p>

                    <p>
                        <input disabled id="some55" type="text" value="Таганский"/>
                        <label htmlFor="some55" className='textLabel'> {this.userInfo.subOrgName} </label>
                    </p>
                    <p>
                        <input disabled id="some66" type="text" value="Менеджер"/>
                        <label htmlFor="some66" className='textLabel'> Должность </label>
                    </p>

                </section>
                <section>

                    <h3>Контактные данные</h3>
                    <p>
                        <input disabled id="some77" type="text" value={this.userInfo.phone}/>
                        <label htmlFor="some77" className='textLabel'> Личный телефон </label>
                    </p>
                    <p>
                        <input disabled id="some88" type="text" value={this.userInfo.email}/>
                        <label htmlFor="some88" className='textLabel'> E-mail </label>
                    </p>


                </section>
            </div>
        );
    }
}

export default UserProfileForm
