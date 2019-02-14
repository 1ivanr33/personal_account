import React from 'react';
import './UserProfileForm.scss';
import { inject, observer } from "mobx-react";
import {IMobxProviderInjectedProps} from '../MobxProvider';

interface IUserProfileFormState {
    loading: string;
    data: string;
}

@inject("rootStore")
@observer
class UserProfileForm extends React.Component<IMobxProviderInjectedProps, IUserProfileFormState> {
    firstName: string;
    userInfo: {
		firstName: string;
		lastName: string;
		surName: string;
		companyName: string;
		subOrgName: string;
		jobTitle: string;
		phone: string;
		email: string;
    };
    constructor(props: IMobxProviderInjectedProps) {
        super(props);

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
            jobTitle: '',
            phone: '',
            email: ''
        };
    }

    makeRequest(method: string, url: string): Promise<XMLHttpRequest> {
        return new Promise((resolve, reject) => {
///            setTimeout(() => {
                const {rootStore} = this.props;
			    if (!rootStore) throw new Error('rootStore не определен');
			    let tokenValue = window[rootStore.BrowserStorageType].getItem('securityToken');
                console.log('Store.SecurityToken - ' + tokenValue);

                var xhr = new XMLHttpRequest();

                xhr.open(method, url);
                xhr.setRequestHeader("Content-Type", "application/json");
			    xhr.setRequestHeader('Security_Token', tokenValue);

                let requestData = {
                    token: window[rootStore.BrowserStorageType].getItem('securityToken')
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
    }

    componentDidMount() {

        console.log('This happens 3rd.');

        this.setState({ loading: 'true' });

        this.makeRequest('POST', 'http://ivan-comp:7001/war/resources/AdministrationService/getCurrentUserInfo')
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

                    this.userInfo.jobTitle = userInfo.jobTitle;

                    this.userInfo.phone = userInfo.phone;
                    this.userInfo.email = userInfo.email;

                        console.log('firstName - ' + this.firstName);
//                    this.props.history.push("/home");
//                    Store.UserNameVisible = true;
                } else {
                    var errorDescription = respJSON.operationResult.ErrorDescription;
                    /*if (errorCode == "500") {
                        this.setState({Message: 'No user id is found by token'})
                    } else if (errorCode == "501") {
                        this.setState({Message: 'Profile with given id not found'})
                    }*/
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
                        <input disabled id="some44" type="text" value={this.userInfo.companyName}/>
                        <label htmlFor="some44" className='textLabel'> Компания </label>
                    </p>

                    <p>
                        <input disabled id="some55" type="text" value={this.userInfo.subOrgName}/>
                        <label htmlFor="some55" className='textLabel'> Филиал/Отделение </label>
                    </p>
                    <p>
                        <input disabled id="some66" type="text" value={this.userInfo.jobTitle}/>
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
