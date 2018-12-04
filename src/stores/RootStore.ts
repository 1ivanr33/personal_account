import {
	// configure,
	action,
	observable,
	// runInAction,
	// flow,
	// decorate
} from "mobx";
//import React from "react";

export class RootStore {
	@observable UserMenuVisible = 'hidden';
	@observable UserFirstName = '';
	@observable UserSurname = '';
	@observable UserPatronymic = '';
	@observable BrowserStorageType: keyof Window = 'localStorage';

	/*@action BrowserStorageType(){
		localStorage.setItem();
	}*/
}



export const rootStore = new RootStore();