
class Audio {
	constructor() {
		this.ctx = new AudioContext();
		this.nodes = [];
		this.buffers = [];
	}

	/**
	 * Create audio node
	 * @param  {arraybuffer} buffer
	 * @return {promise}
	 */
	createNode(arraybuffer) {
		this.buffers.push({arraybuffer, active: true});
		return 'id';
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

	createNodes() {
		let buffers = this.buffers.filter(buffer => buffer.active);
		return Promise.all(buffers.map(buffer => this.cr(buffer.arraybuffer)));
	}

	play() {
		this.createNodes().then(nodes => {
			nodes.forEach(node => {
				console.log(node);
				node.connect(this.ctx.destination);
				node.start(0);
			});
		});

		// let source = activeNodes.shift();
		// if (activeNodes.length !== 0) {
		// 	activeNodes.reduce((prev, curr) => {
		// 		prev.connect(curr);
		// 		return curr;
		// 	});
		// 	source.connect(activeNodes[0]);
		// 	activeNodes[activeNodes.length - 1].connect(this.ctx.destination);
		// }
		// else {
		// 	source.connect(this.ctx.destination);
		// }
		// source.start(0);
	}

}

export default new Audio();
