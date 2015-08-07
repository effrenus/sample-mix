import React, { Component } from 'react';

export default class Sample extends Component {

	_onClick = () => {
		if (!this.props.sample.attached) {
			this.props.attach(this.props.sample.id);
		}
		else {
			this.props.detach(this.props.sample.id);
		}
	}

	render() {
		return (
			<div className="samples__sample" style={{backgroundColor: this.props.sample.attached ? '#AAA' : ''}} onClick={this._onClick}>
				{this.props.sample.title}
			</div>
		);
	}
}
