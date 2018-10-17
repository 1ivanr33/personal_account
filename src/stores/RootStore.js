import {
	// configure,
	action,
	observable,
	// runInAction,
	// flow,
	// decorate
} from "mobx";
import React from "react";

class RootStore {
	@observable UserNameVisible = '';
	@observable UserMenuVisible = 'hidden';
	@observable SecurityToken = '';
}

export default new RootStore();