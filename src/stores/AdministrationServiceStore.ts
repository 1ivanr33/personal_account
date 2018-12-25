import {
	// configure,
	action,
	//observable,
	// runInAction,
	// flow,
	// decorate
} from "mobx";
import React from 'react';
import {rootStore} from './RootStore';
import {IMobxProviderInjectedProps} from '../MobxProvider';
//import React from "react";
/*export class AdministrationServiceStore extends React.Component<IMobxProviderInjectedProps>  {

	constructor(props: IMobxProviderInjectedProps) {
		super(props);
		};
	readonly url = "http://igitb1700000221.hq.corp.mos.ru:7001/war/resources/AdministrationService";

	@action
	async getSessionNotExpired(): Promise<boolean> {

		const {rootStore} = this.props;
		if (!rootStore) throw new Error('rootStore не определен');
		const url = this.url + '/getSessionNotExpired';
		const tokenValue = window[rootStore.BrowserStorageType].getItem('securityToken');

		let requestData = {
			SecurityToken: tokenValue
		};

		let postData = {
			method: 'POST',
			body: JSON.stringify(requestData),
			headers: {
				'Content-Type': 'application/json'
			}
		};

		const response = await fetch(url, postData);
		const data = await response.json();
		return data.NotExpired;
	}

}

export const administrationServiceStore = new AdministrationServiceStore(this);*/
