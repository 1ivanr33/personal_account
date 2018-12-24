import {
	// configure,
	action,
	observable,
	// runInAction,
	// flow,
	// decorate
} from "mobx";
//import React from "react";
import {AdministrationServiceStore} from "./AdministrationServiceStore";

export class RootStore {
	@observable UserMenuVisible = 'hidden';
	@observable UserFirstName = '';
	@observable UserSurname = '';
	@observable UserPatronymic = '';
	//TODO Тип 'keyof Window' заменить на 'localStorage' | 'sessionStorage'
	@observable BrowserStorageType: keyof Window = 'localStorage';
	@observable AdministrationServiceStore = new AdministrationServiceStore();
}



export const rootStore = new RootStore();