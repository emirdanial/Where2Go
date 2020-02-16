import React from 'react';
import Api from 'Utils/Api.js';
import { notifyWarning } from 'Components/Toasty.js';
import { TabContent, TabPane, Nav, NavItem, NavLink} from 'reactstrap';

export default class Test extends React.Component {
	constructor(props){
		super(props)
		this.state = { posts:[], activeTab:'' }

		this.postData = {
			data : {
				"app_id": "1",
				"platform": "web",
				"userlat": "3.144",
				"userlong": "144.333"
			}
		}
	}

	componentDidMount(){
		Api.post('/promos/index', this.postData)
		.then(response => {
			this.setState({
				posts: response.data.Data.data,
				activeTab: response.data.Data.data[0].id
			})
		})
		.catch( error => { notifyWarning() })
	}

	toggle = id => {
		this.setState({ activeTab: id })
	}

	category = type => {
		if( type === 'Event'){
			return 'post-cata cata-sm cata-primary'
		}
		else if ( type === 'Contest'){
			return 'post-cata cata-sm cata-success'
		}
		else {
			return 'post-cata cata-sm cata-info'
		}
	}

	render(){
		const { posts } = this.state;
		return(
			<div className="container">
	          <div className="section-heading style-2">
	            <h4><i className="fa fa-thumb-tack mr-2" aria-hidden="true" style={{color:'crimson'}} />What's New</h4>
	            <div className="line" />
	          </div>
		        <div className="row no-gutters">
					<div className="col-12 col-md-7 col-lg-8">
				      	<TabContent activeTab={this.state.activeTab}>
				      { posts.map( post =>
	  				        <TabPane tabId={post.id} className={this.state.activeTab === post.id ? 'fade show' : 'fade'}  key={post.id}>
							<a href={"/promo-"+post.id}>
		  				    <div className="single-feature-post video-post bg-img" style={{backgroundImage: 'url('+post.image+')'}}>
					          <div className="post-content">
					            <label className={this.category(post.type)}>{post.type}</label>
					            <label className="post-title">{post.title}</label>
						        <label className="post-date">{post.start_date} - {post.end_date}</label>
					          </div>
					        </div>
					        </a>
	  				        </TabPane>
  				      )}
	  				     </TabContent>
			  		</div>
					<div className="col-12 col-md-5 col-lg-4">
						<Nav tabs className="vizew-nav-tab">
							{ posts.map( post =>
					        <NavItem  key={post.id}>
					          <NavLink className={this.state.activeTab === post.id ? 'fade show active' : ''} onClick={() => this.toggle( post.id ) }>
					            <div className="single-blog-post style-2 d-flex align-items-center ">
						            <div className="post-thumbnail">
						              <img src={post.image} alt="" />
						            </div>
						            <div className="post-content">
					            	  <label className={this.category(post.type)}>{post.type}</label>
					            	  <h6 className="post-title">{post.title}</h6>
						              <label className="post-date">{post.start_date} - {post.end_date}</label>
						              <label className="post-date">{post.promostate}, {post.promocountry}</label>
						            </div>
					          	</div>
					          </NavLink>
					        </NavItem>
							)}
				      	</Nav>
					</div>
				</div>
			</div>
		)
	}
}