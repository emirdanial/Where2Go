import React from 'react';
import User from 'Utils/User.js';
import { checkProfileData, auth } from 'Utils/Helpers.js';
import Api from 'Utils/Api.js';
 
import TopHeader from 'Components/TopHeader.js';
import Navbar from 'Components/Navbar.js';
import Footer from 'Components/Footer.js';

import { ToastContainer } from 'react-toastify';
import { notifyWarning, notifyProfileUpdated } from 'Components/Toasty.js';
import 'react-toastify/dist/ReactToastify.css';
import { Form, Label, Col,Button, FormGroup, Input, CustomInput } from 'reactstrap';
import Session from 'Utils/Session.js';

export default class EditProfile extends React.Component {
	constructor(props){
		super(props)

		this.state = {
			image: User.image,
			name: User.name, login_type: User.login_type,
			mobile_phone: User.mobile_phone === null ? '':User.mobile_phone,
			gender: User.gender === null ? '':User.gender,
			dob: User.dob === null ? '':User.dob, 
			selectedFile: null, isLoading:false
		}
	}

	componentDidMount(){
		auth(Session.getToken())
		if (this.state.gender === 'Male') {
			this.setState({ gender:'1' })
		}
		else if (this.state.gender === 'Female') {
			this.setState({ gender:'2' })
		}
	}

	submitHandler = e => {
	    e.preventDefault()
	    this.setState({isLoading:true})
	    let formData = checkProfileData(this.state)

		Api.post('/auth/me/update', formData)
		.then( response => {
			if (response.data.AppData.status === 'success') {
				localStorage.setItem('name', response.data.Data.name)
				localStorage.setItem('gender', response.data.Data.gender)
				localStorage.setItem('dob', response.data.Data.dob)
				localStorage.setItem('mobile_phone', response.data.Data.mobile_phone)

				if( User.login_type === 'email'){
					localStorage.setItem('image', response.data.Data.image)
				}
				
				notifyProfileUpdated()
				setTimeout( function(){ window.location.replace('/profile') }, 1200)
			}
		})
		.catch( error =>{ notifyWarning() })
		.finally( () => { this.setState({isLoading:false}) })
	}

	render() {
		const { name, mobile_phone, dob, isLoading } = this.state;
		return(
			<div>
				<ToastContainer/>
				<header className="header-area">
					<TopHeader />
					<Navbar />
				</header>
				<section className="section-padding-50">
					<div className="container">
						<div className="section-heading style-2" style={{marginBottom:'10px'}}>
							<h4 style={{textShadow: '3px 3px 4px crimson'}}>Edit Profile</h4>
							<div className="line" />
						</div>
						<Form onSubmit={this.submitHandler}>
						<div className="row">
							<div className="col-lg-4">
								<div className="form-container-img">
									<div className="photo-container">
										<img alt=".." src={this.state.image === '' ? (require('Components/img/no-pic.jpg')) : this.state.image }></img>
									</div>
									{ User.login_type === 'email' ? (
							    		<Input type="file" id="image" onChange={this.uploadHandler} name="file" className="pt-1" />
									):('')}
								</div>
							</div>
							<div className="col-lg-8">
								<div className="form-container">
								<FormGroup row>
									<Label for="name" lg={12}>Name :</Label>
									<Input lg={10} className="form-register mb-2" placeholder="Full name" type="text" name="name" onChange={this.changeHandler} value={name} required></Input>
								</FormGroup>
								<FormGroup row>
									<Label for="gender" lg={3} sm={2}>Gender :</Label>
									<Col lg={9} sm={10} style={{paddingTop:'8px'}}>
										<CustomInput type="radio" onChange={e => this.setState({ gender: '1'})} value="1" checked={this.state.gender === '1'} id="male" name="gender" className="mr-4" label="Male" inline={true}/>
										<CustomInput type="radio" onChange={e => this.setState({ gender: '2'})} value="2" checked={this.state.gender === '2'} id="female" name="gender" className="mr-4" label="Female" inline={true}/>
									</Col>
								</FormGroup>
								<FormGroup row>
									<Label for="dob" lg={12}>Date of Birth :</Label>
									<Input lg={10} className="form-register" type="date" name="dob" onChange={this.changeHandler} value={dob} ></Input>
								</FormGroup>
								<FormGroup row>
									<Label for="mobile" lg={12}>Mobile Phone :</Label>
									<Input lg={10} className="form-register" placeholder="Mobile Phone" type="text" name="mobile_phone" onChange={this.changeHandler} value={mobile_phone} ></Input>
								</FormGroup>
								<Button className="btn-register float-right mt-4" type="submit" disabled={isLoading ? true:false}>Save</Button>
								</div>
							</div>
						</div>
					</Form>
					</div>
				</section>
				<section>
					<Footer/>
				</section>
			</div>
		)
	}

	changeHandler = e => {
		this.setState({ [e.target.name]: e.target.value })
	}

	uploadHandler = e => {
		this.setState({
			selectedFile: e.target.files[0],
			loaded: 0,
			image:URL.createObjectURL(e.target.files[0])
		})
	}
}