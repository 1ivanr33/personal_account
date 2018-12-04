import * as React from 'react';
import './BreadCrumbs.scss';



class BreadCrumbs extends React.Component {

		static defaultProps = {
			items: [
				'Личный кабинет',
				'Профиль пользователя'
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
export default BreadCrumbs