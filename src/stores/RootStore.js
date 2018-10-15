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
	@observable UserMenuVisible = '';
}

export default new RootStore();