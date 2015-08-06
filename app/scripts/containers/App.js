import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'redux/react';
import {SampleGrid} from '../components/SampleGrid';
import * as SampleActions from '../actions/SampleActions';

@connect(state => ({
	samples: state.samples
}))
export default class App extends React.Component {
	render() {
		let {samples, dispatch} = this.props;

		return <SampleGrid samples={samples} {...bindActionCreators(SampleActions, dispatch)} />;
	}
}
