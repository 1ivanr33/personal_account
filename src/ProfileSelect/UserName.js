import React from 'react';
import './UserName.scss'
import BackOpacity from '../ProfileSelect/BackOpacity';
import { Link } from 'react-router-dom';
import { inject, observer } from "mobx-react";

@inject("Store")
@observer
class UserName extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			showMenu: 'hidden'
		};
		this.menuRef = React.createRef();
		this.toggleMenuShow = this.toggleMenuShow.bind(this);
		this.onProfileSelectBlur = this.onProfileSelectBlur.bind(this);
		this.onLinkClick = this.onLinkClick.bind(this);
		this.onBlur = this.onBlur.bind(this);

        this.state = {
            loading: 'initial'
        };

        this.userNameInfo = {
            firstName: '',
            lastName: '',
            surName: '',
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

        this.makeRequest('POST', 'http://igitb1700000221.hq.corp.mos.ru:7001/war/resources/AdministrationService/getUsernameByToken')
            .then(response => {
                var respJSON = JSON.parse(response.responseText);
                console.log('respJSON - ' + respJSON.operationResult);

                var errorCode = respJSON.operationResult.ErrorCode;
                console.log('Response - ' + response.responseText);
                if (errorCode === "0") {
                    console.log('errorCode - ' + errorCode);
                    var userName = respJSON.UserName;

                    this.userNameInfo.firstName = userName.firstName;
///                    let firstInitial = this.userNameInfo.firstName.charAt(0);
//                    console.log('firstName - ' + this.userNameInfo.firstName);
                    this.userNameInfo.lastName = userName.lastName;
//                    console.log('lastName - ' + this.userNameInfo.lastName);
                    this.userNameInfo.surName = userName.surname;
//                    console.log('surName - ' + this.userNameInfo.surName);
                } else {
                    var errorDescription = respJSON.operationResult.ErrorDescription;
                    if (errorCode == "500") {
                        this.setState({Message: 'No user id is found by token'})
                    } else if (errorCode == "501") {
                        this.setState({Message: 'Profile with given id not found'})
                    }
                }
                this.setState({ loading: 'false' });
            })
            .catch(function (err) {
                console.error('Augh, there was an error!', err.statusText);
            });
    }

    toggleMenuShow() {

		let oldState = this.state.showMenu;
		let isVisibleOrHidden = (oldState === 'hidden');
		let newState = (isVisibleOrHidden) ? 'visible' : 'hidden';
		this.setState({
			showMenu: newState
		});
	}

	componentDidUpdate(){
		const { Store } = this.props;
		Store.UserMenuVisible = this.state.showMenu;
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

		const { Store } = this.props;
		let backGroundOpacity = null;
		if (Store.UserMenuVisible === 'visible') {
			backGroundOpacity = <BackOpacity/>;
		}

        return (
			<div>
				<div className='userName' ref={this.menuRef} tabIndex={1} onBlur={this.onBlur} id={this.state.showMenu}>
					<span onClick={this.toggleMenuShow}>{this.userNameInfo.lastName + " " + this.userNameInfo.firstName.charAt(0).toLocaleUpperCase() + ". " + this.userNameInfo.surName.charAt(0).toLocaleUpperCase() + "."}</span>
					{
						this.state.showMenu === 'visible' && (
							<ul className='profileSelect'>
								<li><Link onClick={this.onLinkClick} to="/UserProfile">Профиль пользователя</Link></li>
								<li><Link onClick={this.onLinkClick} to="/CompanyProfile">Профиль компании</Link></li>
								<li><Link onClick={this.onLinkClick} to="/">Выйти</Link></li>
							</ul>
						)
					}
				</div>
				{backGroundOpacity}
			</div>
		);
	}

	onBlur(event) {
		const wrapperEl = this.menuRef.current;
		if (!(wrapperEl.contains(event.target) && wrapperEl.contains(event.relatedTarget))) {
			this.onProfileSelectBlur();
		}
	}

	onLinkClick() {
		this.setState({
			showMenu: 'hidden' //после тестирования == hidden
		});
	}

	onProfileSelectBlur() {
		this.setState({
			showMenu: 'hidden' //после тестирования == hidden
		});
	}
}
export default UserName