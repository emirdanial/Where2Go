import React from 'react';
import axios from 'axios';
import Global from 'Utils/Global.js';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { notifyWarning } from 'Components/Toasty.js';

import {
  Button, Label,
  Modal, ModalBody,
  ModalFooter,
  Container, Form, Col,
  FormGroup, Input, CustomInput 
} from 'reactstrap';

class Signup extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			name:'',
			email:'',
			password:'',
			c_password: '',
			mobile:'',
			gender:'',
			dob:'',
			isError:false, errorInfo:'', isLoading:false,
			modal:this.props.modal
		}
	}

	changeHandler = e => {
		this.setState({ [e.target.name]: e.target.value })
	}

	submitHandler = e => {
		e.preventDefault()
		this.setState({ isLoading:true })
		let postData = {
			data : {
				app_id: 1,
				name: this.state.name,
				email: this.state.email,
				password: this.state.password,
				mobile_phone: this.state.mobile,
				gender: this.state.gender,
				dob: this.state.dob,
				login_type: 'email'
			}
		}

		axios.post( Global.api_url+'/api/auth/register', postData)
			.then( response => {
				if (response.data.AppData.status === 'success') {
					this.notifySuccess()
					this.props.openModal()
				}
				else {
					this.setState({
						isError:true,
						errorInfo: response.data.AppData.message
					})
					this.notifyError()
				}
			})
			.catch( error => {
				notifyWarning()
			})
			.finally( () => {
				this.setState({ isLoading:false })
			})
	}

	render(){
		const {name, email, password, mobile, dob, isError, errorInfo, c_password, isLoading } = this.state;

		return(
			<div>
			<ToastContainer/>
			<Modal isOpen={this.props.modal} toggle={this.props.openModal} size="md" backdropClassName="bd-register" contentClassName="modal-register">
				<Form onSubmit={this.submitHandler}>
					<ModalBody>
					<Container>
					  <FormGroup row>
					    <Label for="name" lg={12}><span style={{color:'red'}}>*</span>Name :</Label>
					    <Input lg={10} className="form-register mb-2" placeholder="Full name" type="text" name="name" onChange={this.changeHandler} value={name} required></Input>
					  </FormGroup>
					  <FormGroup row>
					    <Label for="gender" lg={3} sm={2}><span style={{color:'red'}}>*</span>Gender :</Label>
					    <Col lg={9} sm={10} style={{paddingTop:'8px'}}>
						    <CustomInput type="radio" onChange={e => this.setState({ gender: '1'})} id="male" name="customRadio" className="mr-4" label="Male" inline={true}/>
						    <CustomInput type="radio" onChange={e => this.setState({ gender: '2'})} id="female" name="customRadio" className="mr-4" label="Female" inline={true}/>
	                    </Col>
					  </FormGroup>
					  <FormGroup row>
					    <Label for="dob" lg={12}><span style={{color:'red'}}>*</span>Date of Birth :</Label>
					    <Input lg={10} className="form-register" type="date" name="dob" onChange={this.changeHandler} value={dob} required></Input>
					  </FormGroup>
					  <FormGroup row>
					    <Label for="mobile" lg={12}><span style={{color:'red'}}>*</span>Mobile Phone :</Label>
					    <Input lg={10} className="form-register" placeholder="Mobile Phone" type="text" name="mobile" onChange={this.changeHandler} value={mobile} required></Input>
					  </FormGroup>
					  <FormGroup row>
					    <Label for="email" lg={12}><span style={{color:'red'}}>*</span>Email :</Label>
					    <Input lg={10} className="form-register" placeholder="Email" type="email" name="email" onChange={this.changeHandler} value={email} required></Input>
					  </FormGroup>
					  <FormGroup row>
					    <Label for="password" lg={12}><span style={{color:'red'}}>*</span>Password :</Label>
					    <Input lg={10} className="form-register" placeholder="Min-8. Must contain atleast 1 uppercase & lowercase letter" type="password" name="password" onChange={this.changeHandler} value={password} required></Input>
					  </FormGroup>
					  <FormGroup row>
					    <Label for="c_password" lg={12}><span style={{color:'red'}}>*</span>Confirm Password :</Label>
					    <Input lg={10} className="form-register" placeholder="Please re-type your password" type="password" name="c_password" onChange={this.changeHandler} value={c_password} required></Input>
					  </FormGroup>
					</Container>
					{ isError ? (
		                  <div style={{color:'red', textAlign:'right'}}>
		                  	<span>{errorInfo}</span>
		                  </div>
	                  ) : ''}
					</ModalBody>
					<ModalFooter className="justify-content-end" style={{borderTop: '1px solid #ff000070'}}>
						<Button className="btn-register" disabled={isLoading ? true:false}>SUBMIT</Button>
					</ModalFooter>
				</Form>
	        </Modal>

			</div>
		)
	}	
}

export default Signup