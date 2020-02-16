import React from 'react';

export default class Footer extends React.Component {
	render(){
		return(
			<footer className="footer-area">
			  <div className="container">
			    <div className="row justify-content-center">
			    <div className="col-lg-7 col-sm-12">
			        <div className="footer-widget mt-5 mb-5">
			          <h6 className="widget-title">About Us</h6>
			          {/* Contact Address */}
			          <div className="contact-address">
			            <p>Where2Go is a platform to promote and discover trending events, amazing contest and great deals for free. Our mission is to expose user towards activities that can be done in the free time and spend less by promoting ongoing sales. Follow us on social media to stay update on current trends.</p>
			          	<br/>
			          	<p>Download our mobile apps in Google Play and App Store now!</p>
			          </div>
			          {/* Footer Social Area */}
			          <div className="footer-social-area">
			            <a href="!#" className="facebook"><i className="fa fa-facebook" /></a>
			            <a href="!#" className="google-plus"><i className="fa fa-google-plus" /></a>
			            <a href="!#" className="instagram"><i className="fa fa-instagram" /></a>
			            <a href="!#" className="twitter"><i className="fa fa-twitter" /></a>
			            <a href="!#" className="linkedin"><i className="fa fa-linkedin" /></a>
			          </div>
			        </div>
				  </div>
			    <div className="col-lg-5 col-md-10 col-sm-12">
				    <div className="single-widget newsletter-widget" style={{marginBottom:'50px'}}>
					    {/* Section Heading */}
					    <div className="section-heading style-2 mb-30">
					      <h4>Newsletter</h4>
					      <div className="line" />
					    </div>
					    <p>Subscribe our newsletter to get notification about new event updates, contest information, discount, etc.</p>
					    {/* Newsletter Form */}
					    <div className="newsletter-form">
					      <form action="!!#" method="post">
					        <input type="email" name="nl-email" className="form-control mb-15" id="emailnl" placeholder="Enter your email" />
					        <button type="submit" className="btn" style={{width:'100%', backgroundColor:'#db4437', color:'white'}}>Subscribe</button>
					      </form>
					    </div>
					  </div>
				  </div>
			    </div>
			    </div>  
			  {/* Copywrite Area */}
			  <div className="copywrite-area">
			    <div className="container">
			      <div className="row align-items-center">
			        {/* Copywrite Text */}
			        <div className="col-12 col-sm-6">
			          <p className="copywrite-text">{/* Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. */}
			            Copyright © All rights reserved
			            {/* Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. */}</p>
			        </div>
			        <div className="col-12 col-sm-6">
			          <nav className="footer-nav">
			            <ul>
			              <li><a href="!#">About</a></li>
			              <li><a href="!#">Contact</a></li>
			              <li><a href="!#">Disclaimer</a></li>
			              <li><a href="!#">Privacy</a></li>
			            </ul>
			          </nav>
			        </div>
			      </div>
			    </div>
			  </div>
			</footer>
		)
	}
}

			  //     <div className="col-12 col-sm-6 col-xl-3">
			  //       <div className="footer-widget mb-70">
			  //         {/* Logo */}
			  //         <a href="index.html" className="foo-logo d-block mb-4"><img src="img/core-img/logo2.png" alt="" /></a>
			  //         <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna</p>
			  //         {/* Footer Newsletter Area */}
			  //         <div className="footer-nl-area">
			  //           <form action="!#" method="post">
			  //             <input type="email" name="nl-email" className="form-control" id="nlEmail" placeholder="Your email" />
			  //             <button type="submit"><i className="fa fa-paper-plane" aria-hidden="true" /></button>
			  //           </form>
			  //         </div>
			  //       </div>
			  //     </div>
			  //     {/* Footer Widget Area */}
			  //     <div className="col-12 col-sm-6 col-xl-3">
			  //       <div className="footer-widget mb-70">
			  //         <h6 className="widget-title">Sport Videos</h6>
			  //         {/* Single Blog Post */}
			  //         <div className="single-blog-post d-flex">
			  //           <div className="post-thumbnail">
			  //             <img src="img/bg-img/1.jpg" alt="" />
			  //           </div>
			  //           <div className="post-content">
			  //             <a href="single-post.html" className="post-title">DC Shoes: gymkhana the</a>
			  //             <div className="post-meta d-flex justify-content-between">
			  //               <a href="!#"><i className="fa fa-comments-o" aria-hidden="true" /> 14</a>
			  //               <a href="!#"><i className="fa fa-eye" aria-hidden="true" /> 34</a>
			  //               <a href="!#"><i className="fa fa-thumbs-o-up" aria-hidden="true" /> 84</a>
			  //             </div>
			  //           </div>
			  //         </div>
			  //         {/* Single Blog Post */}
			  //         <div className="single-blog-post d-flex">
			  //           <div className="post-thumbnail">
			  //             <img src="img/bg-img/2.jpg" alt="" />
			  //           </div>
			  //           <div className="post-content">
			  //             <a href="single-post.html" className="post-title">Sweet Yummy Chocolatea Tea</a>
			  //             <div className="post-meta d-flex justify-content-between">
			  //               <a href="!#"><i className="fa fa-comments-o" aria-hidden="true" /> 14</a>
			  //               <a href="!#"><i className="fa fa-eye" aria-hidden="true" /> 34</a>
			  //               <a href="!#"><i className="fa fa-thumbs-o-up" aria-hidden="true" /> 84</a>
			  //             </div>
			  //           </div>
			  //         </div>
			  //       </div>
			  //     </div>
			  //     {/* Footer Widget Area */}
			  //     <div className="col-12 col-sm-6 col-xl-3">
			  //       <div className="footer-widget mb-70">
			  //         <h6 className="widget-title">Our Address</h6>
			  //         {/* Contact Address */}
			  //         <div className="contact-address">
			  //           <p>101 E 129th St, East Chicago, <br />IN 46312, US</p>
			  //           <p>Phone: 001-1234-88888</p>
			  //           <p>Email: info.colorlib@gmail.com</p>
			  //         </div>
			  //         {/* Footer Social Area */}
			  //         <div className="footer-social-area">
			  //           <a href="!#" className="facebook"><i className="fa fa-facebook" /></a>
			  //           <a href="!#" className="google-plus"><i className="fa fa-google-plus" /></a>
			  //           <a href="!#" className="instagram"><i className="fa fa-instagram" /></a>
			  //           <a href="!#" className="twitter"><i className="fa fa-twitter" /></a>
			  //           <a href="!#" className="linkedin"><i className="fa fa-linkedin" /></a>
			  //         </div>
			  //       </div>
			  //     </div>
			  //   </div>
			  // </div>