import {RouteComponentProps} from 'react-router-dom';

interface IParams {
	id: string;
}

export type TRouteComponentProps = RouteComponentProps<IParams>;