import React from 'react';
import User from 'Utils/User.js';
import Api from 'Utils/Api.js';
import { checkPromoData } from 'Utils/Helpers.js';

import Geocode from "react-geocode";
import PlacesAutocomplete from 'react-places-autocomplete';
import { notifyWarning, notifyPromoSuccess } from 'Components/Toasty.js';

import {
  Button, Label,
  Modal, ModalBody,
  ModalFooter, ModalHeader,
  Container, Form, Col,
  FormGroup, Input, CustomInput
} from "reactstrap";

export default class ProfileHeader extends React.Component {
		constructor(props) {
		super(props);
		this.state = {
			promolat: '', promolong: '', promostate: '', promocountry: '',
			title:'', description:'', type_id:'', selectedFile: null, wazeable:'1',
			address:'', start_date: new Date(), end_date:'',
			isError:false, isLoading:false, modal: false
		}
	}

	parseAddress = response => {
		response.forEach((data) => {
			if(data.types[0] === 'country'){
				this.setState({ promocountry: data.long_name})
			}
			if(data.types[0] === 'administrative_area_level_1' || data.types[0] === 'locality'){
				this.setState({ promostate: data.long_name})
			}
		})
	}
	 
	handleSelect = address => {
		this.setState({address: address})
		Geocode.fromAddress(address)
			.then( response => {
				let data = response.results[0].address_components;
				this.parseAddress(data)
			    //console.log(response.results[0].address_components);
			    const { lat, lng } = response.results[0].geometry.location;
			    this.setState({ promolat:JSON.stringify(lat), promolong:JSON.stringify(lng)})
		  	},
			error => {
				notifyWarning()
			}
		);
	};

	submitHandler = e => {
		e.preventDefault()
		this.setState({isLoading:true})
		let formData = checkPromoData(this.state)

		Api.post('/promos/create', formData)
		.then(response => {
			if (response.statusText === "Created"){			
				var promos = parseFloat(User.promos) + parseFloat(1)
				localStorage.setItem("promos", promos)
				notifyPromoSuccess()
				setTimeout(function() { window.location.reload() }, 1500);
			}
			else{
				this.setState({ isError:true })
			}
		})
		.catch( error => {
			this.toggle()
			notifyWarning()
		})
		.finally( () => {
			this.setState({ isLoading:false })
		})
	}
	render() {
		const { title, description, isError, isLoading } = this.state;
		set google API key here for geocoding //Geocode.setApiKey("");

		let Location = (
	      <PlacesAutocomplete value={this.state.address} onChange={this.handleChange} onSelect={this.handleSelect}>
	        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
	          <div>
	            <input {...getInputProps({ placeholder: 'Search Location', className: 'form-control', })} required/>
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
		        <div className="container">
					<div className="photo-container">
						<img alt="" src={User.image === null ? require('Components/img/no-pic.jpg') : User.image}></img>
					</div>
		          		<h3 className="title">{User.name}</h3>
					<div className="button-container">
						<Button className="btn-profile" color="success" size="sm" onClick={this.toggle}>
							Add Promo
						</Button>
						<Button className="btn-profile" color="primary" size="sm">
							<a href="/edit-profile" style={{color:'white'}}>Edit Profile</a>
						</Button>
					</div>
		        </div>
		        <Modal isOpen={this.state.modal} toggle={this.toggle} size="lg">
	            <ModalHeader toggle={this.toggle}>New Promo</ModalHeader>
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
					        <Input type="date" name="start_date" className="form-date" onChange={this.changeHandler} required/>
						</Col>
					    <Col lg={6} md={6}>
					      	<Label for="endDate"><span style={{color:'red'}}>*</span>End Date :</Label>
							<Input type="date" name="end_date" className="form-date" onChange={this.changeHandler} required/>
					    </Col>
	                  </FormGroup>
	                  <FormGroup row>
						<Label for="type" lg={2} md={3}><span style={{color:'red'}}>*</span>Type :</Label>
						<Col lg={10} md={9} style={{paddingTop:'7px'}}>
						    <CustomInput type="radio" onChange={e => this.setState({ type_id: '1'})} id="event" name="customRadio" className="mr-4" label="Event" inline={true}/>
						    <CustomInput type="radio" onChange={e => this.setState({ type_id: '3'})} id="contest" name="customRadio" className="mr-4" label="Contest" inline={true}/>
						    <CustomInput type="radio" onChange={e => this.setState({ type_id: '2'})} id="deal" name="customRadio" className="mr-4" label="Deal" inline={true}/>
	                    </Col>
	                  </FormGroup>
	                  <FormGroup row>
	                    <Label lg={2} md={3}><span style={{color:'red'}}>*</span>Image :</Label>
	                    <Col lg={10} md={9}>
	                    	<Input type="file" id="image" onChange={this.uploadHandler} name="file" className="pt-1" required/>
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
	                <Button type="submit" color="success" disabled={isLoading ? true:false} >Submit</Button>
	              </ModalFooter>
	            </Form>
	          </Modal>
		    </div>		
		)
	}

	uploadHandler = e => {
		this.setState({ selectedFile: e.target.files[0], loaded: 0, })
	}

	changeHandler = e => {
		this.setState({ [e.target.name]: e.target.value })
	}

	handleChange = address => {
    	this.setState({ address, container:address });
	};

	toggle = () => {
		this.setState( prevState => ({ modal: !prevState.modal }) )
	}
}


	// for (var pair of formData.entries()){
	// 	console.log(pair[0]+ ', '+ pair[1]); 
	// }



