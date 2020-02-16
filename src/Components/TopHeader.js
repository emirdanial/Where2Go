import React from 'react';
import Session from 'Utils/Session.js';

class TopHeader extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			query:''
		}
	}

	changeHandler = e => {
		this.setState({
			[e.target.name]: e.target.value
		})
	}

	submitHandler = e => {
		e.preventDefault();
		window.location.href="/search-"+this.state.query
	}

	logout = e => {
		localStorage.clear()
		sessionStorage.clear()
		window.location.replace('/login')
	}
	profilePage = e => {
		window.location.href="/profile"
	}

	loginPage = e => {
		window.location.href="/login"
	}

	render(){

		const { query } =this.state;
		let button;

		if (Session.getToken() == null) {
	      	button = <button onClick={this.loginPage} className="login-btn"><i className="fa fa-user pr-2" aria-hidden="true" /> Login | Sign Up</button>;
	    } else {
	      	button = (<div>
      			<button onClick={this.profilePage} className="login-btn pl-4"><i className="fa fa-user pr-2" aria-hidden="true" />Profile</button>|
      			<button onClick={this.logout} className="login-btn" ><i className="fa fa-sign-out pr-2" aria-hidden="true" />Logout</button>
      			</div>
	      	);
	    }

		return(
		<div>
			<div className="top-header-area">
		    <div className="container">
		      <div className="row align-items-center">
		        <div className="col-12 col-md-5 col-sm-12">
		        </div>
		        <div className="col-12 col-md-7 col-sm-12">
		          <div className="top-meta-data d-flex align-items-center justify-content-end">

		            <div className="top-search-area">
		              <form onSubmit={this.submitHandler} method="post">
		              	<input placeholder="Search..." type="text" name="query" onChange={this.changeHandler} value={query}></input>
		                <button type="submit" className="btn"><i className="fa fa-search" aria-hidden="true" /></button>
		              </form>
		            </div>
		            <div style={{display:'flex'}}>
		            	{button}
		            </div>
		          </div>
		        </div>
		      </div>
		    </div>
		  </div>
		</div>
		)
	}
}

export default TopHeader;


/*		            <a href="/login" className="login-btn"><i className="fa fa-user" aria-hidden="true" /> Login</a>*/