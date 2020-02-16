import React from 'react';
import axios from 'axios';
import Global from 'Utils/Global.js';
import Session from 'Utils/Session.js';
import { auth } from 'Utils/Helpers.js';
import { notifyWarning } from 'Components/Toasty.js';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import TopHeader from 'Components/TopHeader.js';
import Navbar from 'Components/Navbar.js';
import Footer from 'Components/Footer.js';

export default class SearchResult extends React.Component {
	constructor(props){
		super(props)

		this.state = {
			query:this.props.match.params.query,
			posts:[],
			isLoading:true, 
			page:1,
			total_page:''
		}
	}

	componentDidMount(){
		axios.post(Global.api_url+"/api/promos/search", {
			data : {
				query: this.state.query,
				"app_id": "1",
			    "limit": "9",
			    "offset": "0"
			}
		})
		.then( response => { 
			//console.log(response)
			this.setState({
				posts:response.data.Data.data,
				isLoading:false,
				total_page: response.data.Data.pagination.total_pages,
			})
		})
		.catch( error => {
			this.setState({
				isLoading:false
			})
		})
	}

	likePromo = (e, index) => {
		e.preventDefault()
		auth(Session.getToken());
		if(this.state.posts[index].liked === true){
			axios.post(Global.api_url+'/api/promos/dislike', 
			{ data: { app_id: this.state.app_id, promo_id: this.state.posts[index].id } },
			{ headers : { Authorization: 'Bearer' + Session.getToken() } })
			.then(response => {
				console.log(response)
				let postUpdate = Object.assign({}, this.state);
				postUpdate.posts[index].likes = response.data.Data.likes;
				postUpdate.posts[index].liked = response.data.Data.liked;
				this.setState(postUpdate)
			})
		}
		else {
			axios.post(Global.api_url+'/api/promos/like', 
			{ data: { app_id: this.state.app_id, promo_id: this.state.posts[index].id } },
			{ headers : { Authorization: 'Bearer' + Session.getToken() } })
			.then(response => {
				console.log(response)
				let postUpdate = Object.assign({}, this.state);
				postUpdate.posts[index].likes = response.data.Data.likes;
				postUpdate.posts[index].liked = response.data.Data.liked;
				this.setState(postUpdate)
			})
		}	
	}

	savePromo = (e, index) => {
		e.preventDefault()
		auth(Session.getToken());
		if(this.state.posts[index].saved === true){
			axios.post(Global.api_url+'/api/promos/unsave', 
			{ data: { app_id: this.state.app_id, promo_id: this.state.posts[index].id } },
			{ headers : { Authorization: 'Bearer' + Session.getToken() } })
			.then(response => {
				let postUpdate = Object.assign({}, this.state);
				postUpdate.posts[index].saves -= 1; //response.data.Data.saves;
				postUpdate.posts[index].saved = false; // response.data.Data.saved;
				this.setState(postUpdate)
			})
		}
		else {
			axios.post(Global.api_url+'/api/promos/save', 
			{ data: { app_id: this.state.app_id, promo_id: this.state.posts[index].id } },
			{ headers : { Authorization: 'Bearer' + Session.getToken() } })
			.then(response => {
				let postUpdate = Object.assign({}, this.state);
				postUpdate.posts[index].saves += 1;// response.data.Data.saves;
				postUpdate.posts[index].saved = true;// response.data.Data.saved;
				this.setState(postUpdate)
			})
		}	
	}

	changePage = (i) => {
		this.setState({ isLoading:true })
		axios.post(Global.api_url+"/api/promos/search", {
			data : {
				query: this.state.query,
				"app_id": "1",
			    "limit": "9",
			    "offset": "0"
			}, page:i
		})
		.then(response => {
			this.setState({
				posts: response.data.Data.data,
				page: response.data.Data.pagination.current_page,
				total_page: response.data.Data.pagination.total_pages
			})
		})
		.catch( error => {
			notifyWarning()
		})
		.finally( () => {
			this.setState({isLoading:false})
		})
	}

	current = (i) => {
		if (this.state.page === i) {
			return 'page-item active disabled';
		}
		return 'page-item';
	}

	render(){

		const { posts, isLoading, page, total_page  } = this.state;

		let pages = [];
		for( let i = 1; i <= total_page ; i++){
			pages.push(<li className={this.current(i)} key={i}><a className="page-link" href="# " onClick={ () => this.changePage(i)}>{i}</a></li>)
		}
		return(
			<div>
			<ToastContainer/>
	          <header className="header-area">
	            <TopHeader />
	            <Navbar />
	          </header>

			  { !isLoading ? (
			  	<div className="vizew-grid-posts-area mb-80 mt-50">
				  <div className="container">
				    <div className="row justify-content-center">
				      <div className="col-12">
				        {/* Archive Catagory & View Options */}
				        <div className="archive-catagory-view mb-50 d-flex align-items-center justify-content-between">
				          {/* Catagory */}
				          <div className="archive-catagory">
				            <h4 className="search-title"><i className="fa fa-search mr-2" aria-hidden="true" /> Search results for "{this.state.query}"</h4>
				          </div>
				        </div>
				        {/* Single Post Area */}
						<div className="row justify-content-center">
						{posts.length === 0 ? (
				        	<div style={{textAlign:'center'}} >
				        		<label>No items to display</label>
				        	</div>
				        ) : (
						 posts.map( (post, index) => 
						  <div className="col-lg-4 col-md-6 col-sm-12 mb-5" key={post.id}>
							<div className="single-card-promo" style={{boxShadow: '3px 4px 12px crimson'}}>
							<a href={"/promo-"+post.id}>
							<div className="img-area">
								<img src={post.image} alt="..." className="img-promo"/>
							</div>
							</a>
							<div className="content-area">
								<a href={"/promo-"+post.id} className="post-title">{post.title}</a>
								<label className="post-date">{post.start_date} - {post.end_date}</label>
								<label className="post-location">{post.promostate}, {post.promocountry}</label>
							</div>
							<div className="meta-area">
								<div className="meta-area right">
									<a href="!#" className="mr-3" style={this.state.posts[index].saved ? {color:'#db4437'} : {color:'#A9A9A9'}} onClick={(e) => this.savePromo(e,index)}>
										<i className="fa fa-bookmark mr-1" aria-hidden="true" />{this.state.posts[index].saves}</a>
							        <a href="!#" style={this.state.posts[index].liked ? {color:'#db4437'} : {color:'#A9A9A9'}} onClick={(e) => this.likePromo(e,index)}>
							        	<i className="fa fa-heart mr-1" aria-hidden="true"/>{this.state.posts[index].likes}</a>
								</div>
								<div className="meta-area left">
									<a href={'https://www.google.com/maps/search/?api=1&query='+post.address} target="_blank" rel="noopener noreferrer"><img src={ require('Components/icon-google-maps.png')} alt="google-maps" className="icon-direction mr-3" /></a>
									<a href={'https://waze.com/ul?ll='+post.promolat+','+post.promolong+'=8'} target="_blank" rel="noopener noreferrer"><img src={ require('Components/icon-waze.png')} alt="waze" className="icon-direction" /></a>
								</div>
							</div>
						</div>
			        	</div>
						)
						)}
						</div>
				        {/* Pagination */}
				        <nav className="mt-50">
				          <ul className="pagination justify-content-center">
							<li className={page < 2 ? 'page-item disabled':'page-item'}><a className="page-link" href="# " onClick={() => this.changePage(parseFloat(this.state.page)-1)}><i className="fa fa-angle-left" /></a></li>
				            {pages}
				            <li className={page === total_page ? 'page-item disabled':'page-item'}><a className="page-link" href="# " onClick={() => this.changePage(parseFloat(this.state.page)+1)}><i className="fa fa-angle-right" /></a></li>
				          </ul>
				        </nav>
				      </div>
				    </div>
				  </div>
				</div>
			  ) : (
				<div className="d-flex align-items-center justify-content-center mt-100 mb-100">
					<img src={require('Components/img/test.gif')} alt="..." id="spinner"/>
				</div>
			  )}
			  <Footer />
			</div>
		)
	}
}