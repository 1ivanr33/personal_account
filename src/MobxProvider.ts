import {RootStore} from './stores/RootStore';
export {Provider as default} from 'mobx-react';
export interface IMobxProviderInjectedProps {
	rootStore: RootStore;
}