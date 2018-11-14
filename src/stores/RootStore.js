import {
	// configure,
	//action,
	observable,
	// runInAction,
	// flow,
	// decorate
} from "mobx";
//import React from "react";

class RootStore {
	@observable UserMenuVisible = 'hidden';
}

export default new RootStore();