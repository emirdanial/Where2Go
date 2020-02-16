import React from 'react';

class Bread extends React.Component {
	render(){
		return(
			<div className="vizew-breadcrumb">
			  <div className="container">
			    <div className="row">
			      <div className="col-12">
			        <nav aria-label="breadcrumb">
			          <ol className="breadcrumb">
			            <li className="breadcrumb-item"><a href="#"><i className="fa fa-home" aria-hidden="true" /> Home</a></li>
			            <li className="breadcrumb-item active" aria-current="page">Event</li>
			          </ol>
			        </nav>
			      </div>
			    </div>
			  </div>
			</div>
		)
	}
}

export default Bread;