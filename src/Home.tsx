import React from 'react';
import './Home.scss';
import { inject, observer } from "mobx-react";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {IMobxProviderInjectedProps} from './MobxProvider';
import {TRouteComponentProps} from './TRouteComponentProps';

@inject("rootStore")
@observer
class Home extends React.Component<TRouteComponentProps & IMobxProviderInjectedProps> {
	constructor(props: TRouteComponentProps & IMobxProviderInjectedProps) {
		super(props);
		this.getModules = this.getModules.bind(this);
	}

	async getModules() {

		const url = "http://igitb1700000221.hq.corp.mos.ru:7001/war/resources/AdministrationService/getModules";
		const {rootStore} = this.props;
		if (!rootStore) throw new Error('rootStore не определен');
		let tokenValue = window[rootStore.BrowserStorageType].getItem('securityToken');

		let requestData = {
			Security_Token: tokenValue
		};

		let postData = {
			method: 'POST',
			body: JSON.stringify(requestData),
			headers: {
				'Content-Type': 'application/json',
				'Security_Token': tokenValue
			}
		};

		const response = await fetch(url, postData);
		const data = await response.json();
		let errorCode = data.operationResult.ErrorCode;
		let moduleOne = data.moduleProperty[0];
		let moduleTwo = data.moduleProperty[1];
		let moduleThree = data.moduleProperty[2];
		console.log(errorCode);
		/*if (errorCode == 0) {
			//if(){}
			console.log('SessionNotExpired');
		} else {

			//this.props.history.push("/");
		}*/
	}

	componentDidMount() {
		return this.getModules();
	}

	componentWillMount() {
		if (!( localStorage.getItem('securityToken') || (sessionStorage.getItem('securityToken')))){
			this.props.history.push("/");
		}
	};

	render() {

		const {rootStore} = this.props;
		if (!rootStore) throw new Error('rootStore не определен');
		let tokenValue = window[rootStore.BrowserStorageType].getItem('securityToken');
		const Msp = () => <div className='module module_1'>
			<p className='top'>Меры социальной поддержки</p>
			<p className='middle'>Меры социальной поддержки</p>
			<p className='bottom'>Меры социальной поддержки</p>
		</div>;
		const Contracts = () => <div className='module module_2'>
			<p className='top'>Создать договор на возмещение о выпадающих доходах</p>
			<p className='middle'>Меры социальной поддержки</p>
			<p className='bottom'>Меры социальной поддержки</p>
		</div>;
		const Reports = () => <div className='module module_3'>
			<p className='top'>Центр аналитической отчетности</p>
			<p className='middle'>Подсистема по работе с отчетами для управляющей организации</p>
			<p className='bottom'> </p>
		</div>;

		return (
			<div className='home'>
				<h2>Здравствуйте, {
					rootStore ? rootStore.UserFirstName + ' ' + rootStore.UserSurname : 'rootStore не определен'
				} </h2>
				<p>Выберите подсистему ЕИРЦ или услугу для продолжения работы</p>
				<div className='module_select'>
					<a href={'http://localhost:3000/CheckYourEmail#' + tokenValue}><Msp/></a>
					<a href=" "><Contracts/></a>
					<a href=" "><Reports/></a>
				</div>
			</div>
		);
	}
}
export default withRouter(Home)