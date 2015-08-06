import React, { Component } from 'react';
import { connect } from 'redux/react';
// import { bindActionCreators } from 'redux';
// import ListView from '../components/ListView';
// import * as ListActions from '../actions/SampleActions';

@connect(state => ({
	samples: state.SamplesStore
}))
class SampleManager extends Component {
	let { samples, dispatch } = this.props;
	console.log('SampleManager', this.props);

	render() {
		return 'test';
	}
}

export default SampleManager;
