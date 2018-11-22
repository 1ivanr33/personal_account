import {
	// configure,
	action,
	observable,
	// runInAction,
	// flow,
	// decorate
} from "mobx";
//import React from "react";

class RootStore {
	@observable UserMenuVisible = 'hidden';
	@observable UserFirstName = '';
	@observable UserSurname = '';
	@observable UserPatronymic = '';
	@observable BrowserStorageType = 'localStorage';

	/*@action BrowserStorageType(){
		localStorage.setItem();
	}*/
}

export default new RootStore();