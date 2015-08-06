import React, { Component } from 'react';
import Sample from './Sample';

export class SampleGrid extends Component {
	render() {
		let {attach, detach} = this.props;

		return (
			<div className="samples">
				{this.props.samples.map(sample => {
					return <Sample key={sample.id} attach={attach} detach={detach} sample={sample} />;
				})}
			</div>
		);
	}
}
