import { ATTACH_SAMPLE, DETACH_SAMPLE } from '../constants/ActionTypes';

export function attach(id) {
	return {
		type: ATTACH_SAMPLE,
		id
	};
}

export function detach(id) {
	return {
		type: DETACH_SAMPLE,
		id
	};
}
