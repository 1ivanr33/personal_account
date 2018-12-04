import React from 'react';
import './Home.scss';
import { inject, observer } from "mobx-react";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {IMobxProviderInjectedProps} from './MobxProvider';

@inject("rootStore")
@observer
class Home extends React.Component<RouteComponentProps & IMobxProviderInjectedProps> {

	componentWillMount() {
		if (!( localStorage.getItem('securityToken') || (sessionStorage.getItem('securityToken')))){
			this.props.history.push("/");
		}
	};

	render() {
		const {rootStore} = this.props;
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
				<h2>Здравствуйте, {rootStore.UserFirstName} {rootStore.UserSurname} </h2>
				<p>Выберите подсистему ЕИРЦ или услугу для продолжения работы</p>
				<div className='module_select'>
					<a href=" "><Msp/></a>
					<a href=" "><Contracts/></a>
					<a href=" "><Reports/></a>
				</div>
			</div>
		);
	}
}
export default withRouter(Home)