import React from 'react';
import Api from 'Utils/Api.js';
import Session from 'Utils/Session.js';
import Spinner from 'Utils/Spinner.js';
import { auth, likeHandler, saveHandler } from 'Utils/Helpers.js';

import TopHeader from 'Components/TopHeader.js';
import Navbar from 'Components/Navbar.js';
import Footer from 'Components/Footer.js';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { notifyWarning, notifyTokenExpired } from 'Components/Toasty.js';

class DealsGrid extends React.Component {
	constructor(props){
		super(props)

		this.state = {
			posts:[],
			isLoading:true,
			total_page:'',
			page:1
		}

		this.postData = { 
			data: { 
				app_id: "1",
			    type_id: "2",
			    userlat: "3.144",
			    userlong: "144.333", 
				limit: 9,
			},
			page : this.state.page
		}
	}

	componentDidMount(){
		this.setState({ isLoading:true })
		Api.post('/promos/filter', this.postData)
		.then(response => {
			this.setState({
				posts: response.data.Data.data,
				total_page: response.data.Data.pagination.total_pages
			})
		})
		.catch(error => { notifyWarning() })
		.finally( () => { this.setState({ isLoading:false }) })
	}

	likePromo = async(e, index) => {
		e.preventDefault()
		const isAuth = await auth(Session.getToken())
		if(isAuth){
			const postUpdate = await likeHandler(this.state.posts[index].id, this.state, index, this.state.posts[index].liked)
			console.log(postUpdate)
			if( postUpdate === 'token_expired' ){
				notifyTokenExpired()
			}
			else if ( postUpdate === 'fail'){
				notifyWarning()
			}
			else{
				this.setState({ posts : postUpdate })
			}
		}	
	}

	savePromo = async(e, index) => {
		e.preventDefault()
		const isAuth = await auth(Session.getToken())
		if(isAuth){
			const postUpdate = await saveHandler(this.state.posts[index].id, this.state, index, this.state.posts[index].saved)
			if( postUpdate === 'token_expired' ){
				notifyTokenExpired()
			}
			else if ( postUpdate === 'fail'){
				notifyWarning()
			}
			else{
				this.setState({ posts : postUpdate })
			}
		}	
	}

	changePage = (i) => {
		this.postData['page'] = i;
		this.setState({isLoading:true})

		Api.post('/promos/filter', this.postData)
		.then(response => {
			this.setState({
				posts: response.data.Data.data,
				page: response.data.Data.pagination.current_page,
				total_page: response.data.Data.pagination.total_pages,
				isLoading:false
			})
		})
		.catch( error => { notifyWarning() })
	}

	render(){

		const { posts, isLoading, total_page, page } = this.state;

		let pages = [];
		for( let i = 1; i <= total_page ; i++){
			pages.push(<li className={page === i? 'page-item active disabled':'page-item'} key={i}><a className="page-link" href="# " onClick={ () => this.changePage(i)}>{i}</a></li>)
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
				            <h4><i className="fa fa-percent mr-2" aria-hidden="true" style={{color:'#eeb60f'}} /> Deals</h4>
				          </div>
				        </div>
				        {/* Single Post Area */}
						<div className="row justify-content-center">
						{posts.length === 0 ? (
				        	<div className="justify-content-center" style={{textAlign:'center'}} >
				        		<label>No items to display</label>
				        	</div>
				        ) : (
						 posts.map( (post, index) => 
						  <div className="col-lg-4 col-md-6 col-sm-12 mb-5" key={post.id}>
							<div className="single-card-promo deal">
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
							<li className={page < 2 ? 'page-item disabled':'page-item'}><a className="page-link" href="# " onClick={() => this.changePage(parseFloat(page)-1)}><i className="fa fa-angle-left" /></a></li>
				            {pages}
				            <li className={page === total_page ? 'page-item disabled':'page-item'}><a className="page-link" href="# " onClick={() => this.changePage(parseFloat(page)+1)}><i className="fa fa-angle-right" /></a></li>
				          </ul>
				        </nav>
				      </div>
				    </div>
				  </div>
				</div>
			  ) : (
				<Spinner/>
			  )}
			  <Footer />
			</div>
		)
	}
}
export default DealsGrid;