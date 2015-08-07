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

export function attach(id) {
	return (dispatch, getState) => {
		let state = getState().samples;
		let sample = _.find(state, 'id', id);
		if (sample.active) {
			return;
		}
		if (!sample.loaded) {
			loadAudio(sample.url)
				.then(arraybuffer => audioInst.createNode(arraybuffer))
				.then(nodeId => {
					sample.nodeId = nodeId;
					sample.loaded = true;
					return audioInst.attachAndPlay(nodeId);
				})
				.then(() => dispatch({type: ATTACH_SAMPLE, id}));
		}
		else {
			audioInst.attachAndPlay(sample.nodeId).then(() => dispatch({type: ATTACH_SAMPLE, id}));
		}
	};
}

export function detach(id) {
	return {
		type: DETACH_SAMPLE,
		id
	};
}
