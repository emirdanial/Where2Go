import React from 'react';
import Api from 'Utils/Api.js';
import { notifyWarning } from 'Components/Toasty.js';

export default class MyPromoPanel extends React.Component {
	constructor(props){
		super(props)
		this.state = { posts:[], page:1, total_page:'' }

		this.postData =  {
			data : { app_id: 1, limit: 9, offset: 0 },
		   page : this.state.page
		}
	}

	componentDidMount(){
		Api.post('/promos/show/save', this.postData)
		.then( response => {
			this.setState({
				posts: response.data.Data.data,
				total_page: response.data.Data.pagination.total_pages
			})
		})
		.catch( error => { notifyWarning() })
	}

	changePage = (i) => {
		this.postData['page'] = i;
		this.setState({isLoading:true})

		Api.post('/promos/mypromo', this.postData)
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
		const { posts, page, total_page } = this.state;
		let pages = [];
		for( let i = 1; i <= this.state.total_page ; i++){
			pages.push(<li className={page === i? 'page-item active disabled':'page-item'} key={i}><button className="page-link" href="# " onClick={ () => this.changePage(i)}>{i}</button></li>)
		}

		return(
			<>
	     	<div className="row justify-content-center pt-4">
			{ posts.map( post =>
				<a href={"/promo-"+ post.id} key={post.id}>
				<div className="card-promo">
					<img  className="img-promo-profile" src={post.image} alt="..."></img>
				</div>
				</a>
			)}
			</div>
	     	<div className="row justify-content-center pt-4">
		        <nav className="mt-50">
		          <ul className="pagination justify-content-center">
					<li className={page < 2 ? 'page-item disabled':'page-item'}><button className="page-link" onClick={() => this.changePage(parseFloat(page)-1)}><i className="fa fa-angle-left" /></button></li>
		            {pages}
		            <li className={page === total_page ? 'page-item disabled':'page-item'}><button className="page-link" onClick={() => this.changePage(parseFloat(page)+1)}><i className="fa fa-angle-right" /></button></li>
		          </ul>
		        </nav>
			</div>
			</>
		)
	}
}