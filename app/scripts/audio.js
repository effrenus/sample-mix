import _ from 'lodash';

class Audio {
	constructor() {
		this.ctx = new AudioContext();
		this.nodes = [];
		this.buffers = [];
		this.playing = false;
	}

	/**
	 * Create audio node
	 * @param  {arraybuffer} buffer
	 * @return {promise}
	 */
	createNode(arraybuffer) {
		let id = this.buffers.length + 1;
		this.buffers.push({id, arraybuffer, active: false});
		return id;
	}

	cr(arraybuffer) {
		return new Promise((resolve) => {
			this.ctx.decodeAudioData(arraybuffer, audiobuffer => {
				let source = this.ctx.createBufferSource();
				source.buffer = audiobuffer;
				source.loop = true;
				resolve(source);
			});
		});
	}

	attachActiveNodes() {
		let buffers = this.buffers.filter(buffer => buffer.active);
		return Promise.all(buffers.map(buffer => this.cr(buffer.arraybuffer)));
	}

	attachAndPlay(id) {
		let buffer = _.find(this.buffers, d => d.id === id);
		buffer.active = true;
		return this.cr(buffer.arraybuffer).then(source => {
			let node = {source, id};
			this.nodes.push(node);
			source.connect(this.ctx.destination);
			source.start(0);
		});
	}

	detach(id) {
		this.nodes = this.nodes.filter(node => {
			if (node.id === id) {
				node.source.disconnect();
				return false;
			}
			return true;
		});
	}
}

export default new Audio();
