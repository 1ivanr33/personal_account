import React from 'react';
import './CompanyProfile.scss';
import {Link} from 'react-router-dom';
import {TRouteComponentProps} from '../TRouteComponentProps';
import CompanyProfileForm from '../Profiles/CompanyProfileForm';
import BreadCrumbsCompany from '../BreadCrumbs/BreadCrumbsCompany';
import {IMobxProviderInjectedProps} from '../MobxProvider';
import {inject, observer} from 'mobx-react';

@inject("rootStore")
@inject("administrationServiceStore")
@observer
class CompanyProfile extends React.Component<TRouteComponentProps & IMobxProviderInjectedProps> {

	constructor(props: TRouteComponentProps) {
		super(props);
		this.isSessionValid = this.isSessionValid.bind(this);
	}

	async isSessionValid() {
		const {rootStore, administrationServiceStore} = this.props;
		if (!rootStore || !administrationServiceStore) throw new Error('rootStore не определен');
		const NotExpired = await administrationServiceStore.getSessionNotExpired();
		console.log(NotExpired);

		let errorCode = NotExpired;
		console.log('errorCode - ' + errorCode);
		if (errorCode == true) {
			console.log('SessionNotExpired');
			setTimeout(this.isSessionValid, 30000);
		} else {
			sessionStorage.clear();
			localStorage.clear();
			this.props.history.push("/");
		}
	}

	componentDidMount() {
		return this.isSessionValid();
	}

	render() {
		if (!( localStorage.getItem('securityToken') || (sessionStorage.getItem('securityToken')))){
			this.props.history.push("/");
		}
		return (
			<div className='companyProfile'>

				<BreadCrumbsCompany/>

				<ul>
					<li><Link to='/UserProfile'>Профиль пользователя</Link></li>
					<li><Link to='/CompanyProfile'  id='link-current' >Профиль компании</Link></li>
					<li><Link onClick={this.onLinkClickExit} to='/'>Выйти</Link></li>
				</ul>

				<CompanyProfileForm/>
			</div>
		);
	}

	onLinkClickExit() {
		sessionStorage.clear();
		localStorage.clear();
	}
}
export default CompanyProfile