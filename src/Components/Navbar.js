import React from 'react';

class Navbar extends React.Component {

	componentDidMount(){
		window.test()
	}

	render(){
		
		return(
		    <div className="vizew-main-menu" id="sticker">
		      <div className="classy-nav-container breakpoint-off">
		        <div className="container">
		          {/* Menu */}
		          <nav className="classy-navbar justify-content-between" id="vizewNav">
		            {/* Nav brand */}
		            <a href="/" style={{color:'#ffffff'}} className="nav-brand">
		            	{/*image here*/}
		            	<label className="brand-title" >WHERE2GO</label>
		            </a>
		            {/* Navbar Toggler */}
		            <div className="classy-navbar-toggler">
		              <span className="navbarToggler"><span /><span /><span /></span>
		            </div>
		            <div className="classy-menu">
		              {/* Close Button */}
		              <div className="classycloseIcon">
		                <div className="cross-wrap"><span className="top" /><span className="bottom" /></div>
		              </div>
		              {/* Nav Start */}
		              <div className="classynav">
		                <ul>
		                  <li><a href="/">Home</a></li>
		                  <li><a href="/event">Event</a></li>
		                  <li><a href="/contest">Contest</a></li>
		                  <li><a href="/deals">Deals</a></li>
		                </ul>
		              </div>
		              {/* Nav End */}
		            </div>


		          </nav>
		        </div>
		      </div>
		    </div>
		)
	}
}

export default Navbar;