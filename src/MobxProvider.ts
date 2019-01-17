import {RootStore} from './stores/RootStore';
import {AdministrationServiceStore} from './stores/AdministrationServiceStore';
export {Provider as default} from 'mobx-react';
export interface IMobxProviderInjectedProps {
	rootStore?: RootStore;
	administrationServiceStore?: AdministrationServiceStore;
}