import {
	// configure,
	action,
	//observable,
	// runInAction,
	// flow,
	// decorate
} from "mobx";
//import React from "react";
export class AdministrationServiceStore {

	readonly url = "http://igitb1700000221.hq.corp.mos.ru:7001/war/resources/AdministrationService";

	@action
	async getSessionNotExpired(): Promise<boolean> {

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

export const administrationServiceStore = new AdministrationServiceStore();
