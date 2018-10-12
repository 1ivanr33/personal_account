/*
 временный компонент
 */

import * as React from 'react';
import './BreadCrumbs.scss';



class BreadCrumbsCompany extends React.Component {

	static defaultProps = {
		items: [
			'Личный кабинет',
			'Профиль компании'
		]
	};

	render() {
		return (
			<div className="breadcrumbs">
				{(this.props.items || []).map((item, index) => <span key={index}>{item}</span>)}
			</div>
		);
	}
}
export default BreadCrumbsCompany