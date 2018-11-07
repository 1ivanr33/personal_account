import React from 'react';
import './FooterNavBar.scss'

class FooterNavBar extends React.Component {
	render() {



		return <div className='footerMenu'>
			<p>
			<a id='eirc' href=" "> ЕИРЦ 2018 г. </a>
			<a id='question' href=" ">Задать вопрос </a>
			<a id='help' href=" ">Помощь </a>
			<a id='dit' href=" ">ДИТ </a>
			<a id='lastLink' href=" ">  </a>
			</p>
		</div>;
	}
}
export default FooterNavBar