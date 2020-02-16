import React from 'react';

export default class Spinner extends React.Component {
	render(){
		return(
			<div className="d-flex align-items-center justify-content-center mt-100 mb-100">
				<img src={require('Components/img/test.gif')} alt="..." id="spinner"/>
			</div>
		)
	}
}