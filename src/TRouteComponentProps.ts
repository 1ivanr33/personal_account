import {RouteComponentProps} from 'react-router';

interface IParams {
	id: string;
}

export type TRouteComponentProps = RouteComponentProps<IParams>;