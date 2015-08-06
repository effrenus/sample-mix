import { ATTACH_SAMPLE, DETACH_SAMPLE } from '../constants/ActionTypes';
import _ from 'lodash';
import audioInst from '../audio';

function loadAudio(url) {
	return new Promise((resolve, reject) => {
		let xhr = new XMLHttpRequest();
		xhr.responseType = 'arraybuffer';
		xhr.open('GET', url);
		xhr.onload = function() {
			resolve(xhr.response);
		};
		xhr.onerror = function() {
			reject('error');
		};
		xhr.send(null);
	});
}

let initialState = [
	{id: 1, title: '泉', url: './data/泉.m4a'},
	{id: 2, title: '小鳥', url: './data/小鳥.m4a'},
	{id: 3, title: '雷', url: './data/雷.m4a'}
];

let sampleHandlers = {
	[ATTACH_SAMPLE]: (state, action) => {
		let sample = _.find(state, item => item.id === action.id);
		if (!sample.loaded) {
			loadAudio(sample.url)
				.then(arraybuffer => audioInst.createNode(arraybuffer))
				.then(() => audioInst.play());
		}
		else {
			console.log('qqq');
		}

		return state;
	},
	[DETACH_SAMPLE]: (state) => {
		return state;
	}
};

export function samples(state = initialState, action) {
	return sampleHandlers[action.type] ? sampleHandlers[action.type](state, action) : state;
}

export function audio(state = audioInst) {
	return state;
}
