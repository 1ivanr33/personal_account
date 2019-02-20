import React, {ChangeEvent, KeyboardEvent} from 'react';
import '../PasswordRecovery/PasswordRecovery.scss';
import FooterNavBar from '../FooterNavBar/FooterNavBar';
import { inject, observer } from "mobx-react";
import {Link} from 'react-router-dom';

@inject("rootStore")
@observer
class NotificationCenter extends React.Component {



	render() {

		return (

			<div className='notificationCenter'>

					<div>

						<h3>Центр уведомлений</h3>

					</div>

				</div>

		);
	}
}

export default NotificationCenter;
