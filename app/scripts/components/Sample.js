import React, { Component } from 'react';

export default class Sample extends Component {

	state = {attached: false};

	_onClick = () => {
		if (!this.state.attached) {
			this.props.attach(this.props.sample.id);
		}
		else {
			this.props.detach(this.props.sample.id);
		}
	}

	render() {
		return (
			<div className="samples__sample" onClick={this._onClick}>
				{this.props.sample.title}
			</div>
		);
	}
}
