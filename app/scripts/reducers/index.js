import { ATTACH_SAMPLE, DETACH_SAMPLE } from '../constants/ActionTypes';
import _ from 'lodash';
import audioInst from '../audio';

let initialState = [
	{id: 1, title: '泉', url: './data/泉.m4a', attached: false},
	{id: 2, title: '小鳥', url: './data/小鳥.m4a', attached: false},
	{id: 3, title: '雷', url: './data/雷.m4a', attached: false},
	{id: 4, title: '電車の店員', url: './data/電車の店員.m4a', attached: false},
	{id: 5, title: '地下通路', url: './data/地下通路.m4a', attached: false},
	{id: 6, title: 'シンセ', url: './data/シンセ.m4a', attached: false}
];

let sampleHandlers = {
	[ATTACH_SAMPLE]: (state, action) => {
		return state.map(item => {
			if (item.id === action.id) {
				item.attached = true;
			}
			return item;
		});
	},
	[DETACH_SAMPLE]: (state, action) => {
		let sample = _.find(state, 'id', action.id);
		audioInst.detach(sample.nodeId);
		return state.map(item => {
			if (item.id === action.id) {
				item.attached = false;
			}
			return item;
		});
	}
};

export function samples(state = initialState, action) {
	return sampleHandlers[action.type] ? sampleHandlers[action.type](state, action) : state;
}

export function audio(state = audioInst) {
	return state;
}
