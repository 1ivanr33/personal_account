/*
 временный компонент
 */

import * as React from 'react';
import './BreadCrumbs.scss';

interface IBreadCrumbsCompanyProps {
	items: string[];
}

class BreadCrumbsCompany extends React.Component<IBreadCrumbsCompanyProps> {

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