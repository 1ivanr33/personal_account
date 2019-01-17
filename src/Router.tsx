import React from 'react'
import LoginForm from './loginForm/loginForm';
import Desktop from './Desktop';
import Header from './Header/Header';
import Home from './Home';
import UserProfile from './ProfileSelect/UserProfile';
import CompanyProfile from './ProfileSelect/CompanyProfile';
import PasswordRecovery from './PasswordRecovery/PasswordRecovery';
import UserNotFound from './PasswordRecovery/UserNotFound';
import { BrowserRouter, Route } from 'react-router-dom';
import {rootStore} from './stores/RootStore';
import {administrationServiceStore} from './stores/AdministrationServiceStore'
import CheckYourEmail from './PasswordRecovery/CheckYourEmail';
import EnterNewPassword from './PasswordRecovery/EnterNewPassword';
import MobxProvider from './MobxProvider'



// TODO Перенести определение rootStore в файл src/MobxProvider.ts (например путем наследования MobxProvider от Provider).

const Router = () => (

	<BrowserRouter>
		<MobxProvider rootStore={rootStore} administrationServiceStore={administrationServiceStore}>
			<div>
				<Desktop>
					<Header/>
					<Route exact path="/" component={LoginForm}/>
					<Route path="/Home" component={Home}/>
					<Route path="/UserProfile" component={UserProfile}/>
					<Route path="/CompanyProfile" component={CompanyProfile}/>
					<Route path="/PasswordRecovery" component={PasswordRecovery}/>
					<Route path="/UserNotFound" component={UserNotFound}/>
					<Route path="/CheckYourEmail" component={CheckYourEmail}/>
					<Route path="/EnterNewPassword/:id" component={EnterNewPassword}/>
				</Desktop>
			</div>
		</MobxProvider>
	</BrowserRouter>

)

export default Router