import React from 'react';

class Sidebar extends React.Component {
	
	render(){
		return(
			<div className="col-12 col-md-5 col-lg-4">
	          <div className="sidebar-area">

	            {/* ***** Single Widget ***** */}
	            <div className="single-widget newsletter-widget mb-50">
	              {/* Section Heading */}
	              <div className="section-heading style-2 mb-30">
	                <h4>Newsletter</h4>
	                <div className="line" />
	              </div>
	              <p>Subscribe our newsletter to get notification about new events, contest and great deals</p>
	              {/* Newsletter Form */}
	              <div className="newsletter-form">
	                <form action="!#" method="post">
	                  <input type="email" name="nl-email" className="form-control mb-15" id="emailnl" placeholder="Enter your email" />
	                  <button type="submit" className="btn vizew-btn w-100">Subscribe</button>
	                </form>
	              </div>
	            </div>
	            {/* ***** Single Widget ***** */}
	            <div className="single-widget latest-video-widget mb-50">
	              {/* Section Heading */}
	              <div className="section-heading style-2 mb-30">
	                <h4>Latest Promo</h4>
	                <div className="line" />
	              </div>
	              {/* Single Blog Post */}
	              <div className="single-post-area mb-30">
	                {/* Post Thumbnail */}
	                <div className="post-thumbnail">
	                  <img src="img/bg-img/13.jpg" alt="" />
	                  {/* Video Duration */}
	                  <span className="video-duration">05.03</span>
	                </div>
	                {/* Post Content */}
	                <div className="post-content">
	                  <a href="!#" className="post-cata cata-sm cata-success">Sports</a>
	                  <a href="single-post.html" className="post-title">Full article Prince Charles's 'urgent' global research</a>
	                  <div className="post-meta d-flex">
	                    <a href="!#"><i className="fa fa-comments-o" aria-hidden="true" /> 14</a>
	                    <a href="!#"><i className="fa fa-eye" aria-hidden="true" /> 38</a>
	                    <a href="!#"><i className="fa fa-thumbs-o-up" aria-hidden="true" /> 22</a>
	                  </div>
	                </div>
	              </div>
	              {/* Single Blog Post */}
	              <div className="single-blog-post d-flex">
	                <div className="post-thumbnail">
	                  <img src="img/bg-img/1.jpg" alt="" />
	                </div>
	                <div className="post-content">
	                  <a href="single-post.html" className="post-title">DC Shoes: gymkhana five; the making of</a>
	                  <div className="post-meta d-flex justify-content-between">
	                    <a href="!#"><i className="fa fa-comments-o" aria-hidden="true" /> 29</a>
	                    <a href="!#"><i className="fa fa-eye" aria-hidden="true" /> 08</a>
	                    <a href="!#"><i className="fa fa-thumbs-o-up" aria-hidden="true" /> 23</a>
	                  </div>
	                </div>
	              </div>
	            </div>
	          </div>
	        </div>
		)
	}
}
export default Sidebar;