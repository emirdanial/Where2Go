import React from "react";
import Slider from "react-slick";

import Api from 'Utils/Api.js';
import Session from 'Utils/Session.js';

import { auth, likeHandler, saveHandler } from 'Utils/Helpers.js';
import { notifyWarning, notifyTokenExpired } from 'Components/Toasty.js';

export default class EventSection extends React.Component {
	constructor(props){
		super(props)
		this.state = { posts:[] }
		this.postData = { data: { app_id: '1', type_id:'1', userlat:'3.144', userlong:'144.333'} }
	}

	componentDidMount(){
		Api.post('/promos/filter', this.postData )
		.then(response => {
			this.setState({ posts: response.data.Data.data })
		})
		.catch(error => { notifyWarning() })
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
				//console.log(postUpdate)
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

	render() {
		const{ posts } = this.state;

	    var settings = {
	      infinite: true,
	      speed: 500,
	      slidesToShow: 1,
	      slidesToScroll: 1,
	      responsive: [
			{
	          breakpoint: 1024,
	          settings: { slidesToShow: 2, slidesToScroll: 2, infinite: true, dots: true }
	        },
	        {
	          breakpoint: 767,
	          settings: { slidesToShow: 1, slidesToScroll: 1, infinite: true, dots: true }
	        }
	      ]
	    }

		return(
	        <div className="col-12 pb-5">
	          <div className="section-heading style-2">
	            <h4><i className="fa fa-map mr-2" aria-hidden="true" style={{color:'#0062ff73'}} />Event</h4>
	            <div className="line" />
	          </div>
	          <div>
				  <Slider {...settings}>
				  	{ posts.map( (post, index) =>
						<div className="single-card-promo-2" key={post.id}>
						<a href={"/promo-"+post.id} data={post[index]}>
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
				  	)}
				  </Slider>
	          </div>
	        </div>
		)
	}
}