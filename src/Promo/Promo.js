import React from 'react';
import User from 'Utils/User.js';
import PlacesAutocomplete from 'react-places-autocomplete';
import Geocode from "react-geocode";
import { auth, checkPromoData } from 'Utils/Helpers.js';
import { Redirect } from 'react-router-dom';
import Api from 'Utils/Api.js';
import Session from 'Utils/Session.js';

import TopHeader from 'Components/TopHeader.js';
import Navbar from 'Components/Navbar.js';
import Footer from 'Components/Footer.js';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { notifyWarning, notifyPromoDeleted, notifyPromoUpdated, notifyTokenExpired } from 'Components/Toasty.js';
import {
  Modal, ModalBody,
  ModalFooter, ModalHeader,
  Container, Form, Col, Button,
  FormGroup, Label, Input, CustomInput
} from "reactstrap";

class Promo extends React.Component {
 	constructor(props){
		super(props)

		this.state = {
			app_id: "1", promolat: '', promolong: '',
			promostate: '', promocountry: '', wazeable:'1',
			promo_id: this.props.match.params.id, post:[],
			input_type:'text', modal: false,
			image:'', address:'', title:'', description:'',
			start_date:'', nd_date:'', type:'', type_id:'',
			owned:'', liked:'', likes:'', saved:'', selectedFile:[],
			isLoading:true, isError:false, isDeleted:false
		}
	}

	componentDidMount(){
		console.log(this.props)
		Api.post('/promos/show', { data:{app_id:this.state.app_id, promo_id:this.state.promo_id} } )
		.then(response => {
			if(response.data.AppData.status === 'fail'){
				this.setState({ isDeleted:true})
			}
			else{
			this.setState({
					post: response.data.Data,
					promolat: response.data.Data.promolat, 
					promolong: response.data.Data.promolong, 
					promostate: response.data.Data.promostate, 
					promocountry: response.data.Data.promocountry,
					image: response.data.Data.image, 
					address: response.data.Data.address,
					start_date:response.data.Data.start_date, 
					end_date: response.data.Data.end_date,
					owned: response.data.Data.owned, 
					type: response.data.Data.type,
					title: response.data.Data.title, 
					description: response.data.Data.description,
					liked: response.data.Data.liked, 
					likes: response.data.Data.likes,
					saves: response.data.Data.saves, 
					saved: response.data.Data.saved
				})
			}
		})
		.then( () => {
			const {type} = this.state;
			if (type === 'Event') {
				this.setState({ type_id: '1' })
			}
			else if(type === 'Contest'){
				this.setState({ type_id: '3' })
			}
			else {
				this.setState({ type_id: '2' })
			}
		})
		.catch(error => {
			notifyWarning()
		})
		.finally( () => {
			this.setState({isLoading:false})
		})
	}

	parseAddress = response => {
		response.forEach((data) => {
			if(data.types[0] === 'country'){
				this.setState({ promocountry: data.long_name})
			}
			if(data.types[0] === 'administrative_area_level_1'){
				this.setState({ promostate: data.long_name})
			}
		})
	}

	handleChange = address => {
    	this.setState({ address, container:address });
	};
	 
	handleSelect = address => {
		this.setState({address: address})
		Geocode.fromAddress(address)
			.then( response => {
				let data = response.results[0].address_components;
				this.parseAddress(data)
			    const { lat, lng } = response.results[0].geometry.location;
			    this.setState({ promolat:JSON.stringify(lat), promolong:JSON.stringify(lng)})
			    //console.log(Object.keys(this.state.promolat).length)
		  	},
			error => {
				notifyWarning()
			}
		);
	};

	deletePromo = (id) => {
		this.setState({ isLoading:true })
		Api.post('/promos/delete', { data:{app_id:this.state.app_id, promo_id:id}})
			.then(response => {
				if (response.data.AppData.status === 'success') {
					var promos = parseFloat(User.promos) - parseFloat(1)
					localStorage.setItem("promos", promos)
					notifyPromoDeleted()
					setTimeout(function(){ window.location.replace('/profile') }, 1500)
				}
				else {
					notifyWarning()
				}
			})
			.catch(error => { notifyWarning() })
	}

	submitHandler = e => {
    	e.preventDefault()
		let formData = checkPromoData(this.state)
	    for (var pair of formData.entries())
		{
		 console.log(pair[0]+ ', '+ pair[1]); 
		}
	    Api.post('/promos/update', formData )
		    .then(response => {
				if (response.data.AppData.status === 'success') {
					notifyPromoUpdated()
					setTimeout( function(){ window.location.reload() }, 1200)
				}
				else {
		      		this.setState({ isError:true })
				}
		    })
		    .catch( error => { notifyWarning() })
  	}

	savePromo = e => {
		e.preventDefault()
		auth(Session.getToken());
		if(this.state.saved === true){
			Api.post('promos/unsave', { data: { app_id: this.state.app_id, promo_id: this.state.promo_id } })
			.then(response => {
				this.setState({
					saves: response.data.Data.saves,
					saved: false,
				})
			})
		}
		else {
			Api.post('/api/promos/save', { data: { app_id: this.state.app_id, promo_id: this.state.promo_id } })
			.then(response => {
				this.setState({
					saves: response.data.Data.saves,
					saved: true,
				})
			})
		}
	}

	likePromo = e => {
		e.preventDefault()
		auth(Session.getToken());
		if(this.state.liked === true){
			Api.post('/promos/dislike', { data: { app_id: this.state.app_id, promo_id: this.state.promo_id } })
			.then(response => {
				console.log(response)
				this.setState({
					likes: response.data.Data.likes,
					liked: response.data.Data.liked
				})
			})
		}
		else if( this.state.liked === false) {
			Api.post('/promos/like', { data: { app_id: this.state.app_id, promo_id: this.state.promo_id } })
			.then(response => {
				console.log(response)
				this.setState({
					likes: response.data.Data.likes,
					liked: response.data.Data.liked
				})
			})
		}
		else {
			notifyTokenExpired()
		}
	}

	uploadHandler = e => {
		this.setState({ selectedFile: e.target.files[0], loaded: 0, })
	}

	changeHandler = e => {
		this.setState({ [e.target.name]: e.target.value })
	}


	toggle = () => {
		this.setState(prevState => ({ modal: !prevState.modal }) );
	}
	
	typeChange = e => {
		this.setState({ type_id: e.target.value })
	}

	render(){

		const { address, start_date, end_date, title, description, isLoading, post, input_type, isError, isDeleted } = this.state;
		Geocode.setApiKey("AIzaSyC_OkZ-QHKHXSdSKCgeIO1P5dtvgi2Gkrw");

		if( isDeleted ){
			return <Redirect to={{pathname:'/profile'}}/>;
		}

		let Location = (
	      <PlacesAutocomplete value={address} onChange={this.handleChange} onSelect={this.handleSelect}>
	        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
	          <div>
	            <input {...getInputProps({ placeholder: 'Search Location', className: 'form-control', })}/>
	            <div className="autocomplete-dropdown-container">
	              {loading && <div>Loading...</div>}
	              {suggestions.map(suggestion => {
	                const className = suggestion.active
	                  ? 'suggestion-item--active'
	                  : 'suggestion-item';
	         
	                return (
	                  <div{...getSuggestionItemProps(suggestion, {className})}>
	                    <span>{suggestion.description}</span>
	                  </div>
	                );
	              })}
	            </div>
	          </div>
	        )}
	      </PlacesAutocomplete>
	    );

		return(
			<div>
			<ToastContainer/>
				<header className="header-area">
					<TopHeader />
					<Navbar />
				</header>

			  { !isLoading ? (
			  	<div>
			  	<div className="vizew-breadcrumb">
				  <div className="container">
				    <div className="row">
				      <div className="col-12">
				        <nav aria-label="breadcrumb">
				          <ol className="breadcrumb">
				            <li className="breadcrumb-item"><a href="/"><i className="fa fa-home" aria-hidden="true" /> Home</a></li>
				            <li className="breadcrumb-item"><a href={"/"+this.state.type}>{this.state.type}</a></li>
				            <li className="breadcrumb-item active" aria-current="page">{title === '' ? ('Promo '+this.state.promo_id) : title}</li>
				          </ol>
				        </nav>
				      </div>
				    </div>
				  </div>
				</div>
			  	<div className="container mb-5">
				  <div className="row">
				    <div className="col-12">
				      <div className="single-promo-area">
				        <img src={this.state.image} alt="..."/>
				      </div>
				    </div>
				  </div>
				  <div className="row justify-content-center">
				    <div className="col-12 col-lg-12">
				    	<div className="post-meta">
				    		<div className="detail">
								<a href="!#" style={this.state.saved ? {color:'#db4437'} : {color:'#A9A9A9'} } onClick={e => this.savePromo(e)}>
									<i className="fa fa-bookmark fa-lg  pr-2" aria-hidden="true" />{this.state.saves}
								</a>
				                <a href="!#" style={this.state.liked ? {color:'#db4437'} : {color:'#A9A9A9'} } onClick={e => this.likePromo(e)}>
				                	<i className="fa fa-heart fa-lg pr-2" aria-hidden="true" />{this.state.likes === null ? '0' : this.state.likes}
				                </a>
				    		</div>
				    		<div className="owned">
				    		{ post.owned ? (
				    			<div>
					          <a href="#/" className="edit" onClick={() => this.deletePromo(this.state.promo_id)} ><i className="fa fa-trash" /></a>
					          <a href="#/" className="edit" onClick={this.toggle} ><i className="fa fa-edit" /></a>
					          </div>
				    		) : (
								<div className="meta-area left">
									<a href={'https://www.google.com/maps/search/?api=1&query='+post.address} target="_blank" rel="noopener noreferrer"><img src={ require('Components/icon-google-maps.png')} alt="google-maps" style={{width:'32px', height:'32px'}} className="mr-3" /></a>
									<a href={'https://waze.com/ul?ll='+post.promolat+','+post.promolong+'=8'} target="_blank" rel="noopener noreferrer"><img src={ require('Components/icon-waze.png')} alt="waze" style={{width:'32px', height:'32px'}} /></a>
								</div>
				    		)}
							</div>
				    	</div>
				    	<div className="post-content" style={{textAlign:'center'}}>
				    		<p className="post-title" style={{paddingTop:'50px'}}>{post.title}</p>
				    		<p className="post-date">{post.start_date + " - " + post.end_date}</p>
				    		<p className="post-desc">{post.description}</p>
				    		<p className="post-addr">{post.address}</p>
				    	</div>
						<Modal isOpen={this.state.modal} toggle={this.toggle} size="lg" style={{color:'black'}}>
						<ModalHeader toggle={this.toggle}>Edit Promo</ModalHeader>
							<Form onSubmit={this.submitHandler}>
							<ModalBody className="modal-promo">
							<Container>
							  <FormGroup row>
							    <Label for="title" lg={2} md={12}>Title :</Label>
							    <Col lg={10} md={12}>
							      <Input type="text" onChange={this.changeHandler} value={title} name="title" id="title" placeholder="Promo title (optional)" />
							    </Col>
							  </FormGroup>
							  <FormGroup row>
							    <Label for="description" lg={2} md={12}>Description :</Label>
							    <Col lg={10} md={12}>
							      <Input type="textarea" onChange={this.changeHandler} value={description} name="description" id="description" placeholder="Description of your promo (eg: Ticket price, Venue, Instructions etc..) (optional)"/>
							    </Col>
							  </FormGroup>
							  <FormGroup row>
							    <Label for="address" lg={2} md={12}><span style={{color:'red'}}>*</span>Location :</Label>
							    <Col lg={10} md={12}>
									{Location}
							    </Col>
							  </FormGroup>
			                  <FormGroup row className="mt-4">
			                  	<Col lg={6} md={6}>
							  		<Label for="startDate"><span style={{color:'red'}}>*</span>Start Date :</Label>
							        <Input type={input_type} className="form-date" name="start_date" value={start_date} placeholder={start_date} onFocus={ e => this.setState({input_type:'date'})} onBlur={ e => this.setState({input_type:'text'})} onChange={this.changeHandler}/>
								</Col>
					    		<Col lg={6} md={6}>
							      <Label for="endDate"><span style={{color:'red'}}>*</span>End Date :</Label>
									<Input type={input_type} className="form-date" name="end_date" value={end_date} placeholder={end_date} onFocus={ e => this.setState({input_type:'date'})} onBlur={ e => this.setState({input_type:'text'})} onChange={this.changeHandler}/>
							    </Col>
	                  		  </FormGroup>
							  <FormGroup row>
								<Label for="type" lg={2} md={3}><span style={{color:'red'}}>*</span>Type :</Label>
								<Col lg={10} md={9} style={{paddingTop:'7px'}}>
								    <CustomInput type="radio" name="promo_type"  value="1" checked={this.state.type_id === '1'} onChange={this.typeChange} id="Event" className="mr-4" label="Event" inline={true} />
								    <CustomInput type="radio" name="promo_type"  value="3" checked={this.state.type_id === '3'} onChange={this.typeChange} id="Contest" className="mr-4" label="Contest" inline={true} />
								    <CustomInput type="radio" name="promo_type"  value="2" checked={this.state.type_id === '2'} onChange={this.typeChange} id="Deals" className="mr-4" label="Deals" inline={true} />
							    </Col>
							  </FormGroup>
							  <FormGroup row>
							    <Label lg={2} md={3}><span style={{color:'red'}}>*</span>Image :</Label>
							    <Col lg={10} md={9}>
							    	<Input type="file" id="image" onChange={this.uploadHandler} name="file" className="pt-1" />
							    </Col>
							  </FormGroup>
			                  { isError ? (
				                  <div style={{color:'red', textAlign:'right'}}>
				                  	<span>*Fill in the required field</span>
				                  </div>
			                  ) : ''}
							</Container>
							</ModalBody>
							<ModalFooter className="justify-content-end">
							<Button type="submit" color="success" disabled={isLoading ? true:false}>Submit</Button>
							</ModalFooter>
							</Form>
						</Modal>
			        </div>
			      </div>
			    </div>
			    <Footer />
			  </div>
			) : (
				<div className="d-flex align-items-center justify-content-center mt-5">
					<img src={require('Components/img/test.gif')} alt="Loading..."/>
				</div>
			 )}
	        </div>
		)
	}
}

export default Promo;