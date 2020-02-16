import React from 'react';
import axios from 'axios';
import FacebookLogin from 'react-facebook-login';
import User from 'Utils/User.js';
import Global from 'Utils/Global.js';

import Signup from './Signup.js';
import TopHeader from 'Components/TopHeader.js';
import Navbar from 'Components/Navbar.js';
import Footer from 'Components/Footer.js'
import { notifyWarning, notifyErrorText } from 'Components/Toasty.js';
import { Input } from 'reactstrap';
import Session from 'Utils/Session.js';

class Login extends React.Component {
	constructor(props){
		super(props)

		let loggedIn = true
		if(User.token == null){
			loggedIn = false
		}

		this.state = {
			loggedIn,
			login_type: "email",
			app_id: User.app_id,
			platform: 'WEB',
			email:'',
			password:'',
			isLoading:false, isError:false,
			errorInfo:'',
			modal: false,
		};
	}

	changeHandler = e => {
		this.setState({
			[e.target.name]: e.target.value
		})
	}

	responseFacebook = response => {
		//localStorage.setItem("image", 'https://img2.thejournal.ie/inline/1881369/original/?width=630&version=1881369')
		this.setState({ login_type:'facebook', isLoading:true })
		localStorage.setItem("name", response.name)
		localStorage.setItem("email", response.email)
		localStorage.setItem("image", response.picture.data.url)
		localStorage.setItem("login_type", this.state.login_type)

		axios.post(Global.api_url+'/api/auth/login', {
			data:{
				login_type: this.state.login_type,
				app_id: this.state.app_id,
				platform: this.state.platform,
				name: response.name,
				email: response.email
			}
		})
		.then( response => {
			Session.setToken(response.data.Data.token)
			//localStorage.setItem("token", response.data.Data.token)
			localStorage.setItem("promos", response.data.Data.promos)
			this.setState({ loggedIn: true })
		})
		.catch( error => {
			notifyWarning()
		})
		.finally( () => {
			this.setState({isLoading:false})
		})
	}

	submitHandler = e =>{
		e.preventDefault()
		this.setState({isLoading:true})
		axios.post(Global.api_url+'/api/auth/login', {
			data:{
				login_type: this.state.login_type,
				platform: this.state.platform,
				app_id: this.state.app_id,
				email: this.state.email,
				password: this.state.password
			}
		})
		.then(response => {
			if (response.data.AppData.status === 'fail') {
				this.setState({ errorInfo:response.data.AppData.message })
				notifyErrorText(this.state.errorInfo)
			}
			else {
			Session.setToken(response.data.Data.token)
			//localStorage.setItem("token", response.data.Data.token)
			localStorage.setItem("name", response.data.Data.name)
			localStorage.setItem("gender", response.data.Data.gender)
			localStorage.setItem("dob", response.data.Data.dob)
			localStorage.setItem("mobile_phone", response.data.Data.mobile_phone)
			localStorage.setItem("email", response.data.Data.email)
			localStorage.setItem("promos", response.data.Data.promos)
			localStorage.setItem("image", response.data.Data.image)
			localStorage.setItem("login_type", this.state.login_type)
			//window.location.replace("/profile")
			this.setState({ loggedIn: true})
			}
		})
		.catch( error => {
			notifyWarning()
		})
		.finally( () => {
			this.setState({ isLoading:false})
		})
	}

	authenticated = () => {
		if(this.state.loggedIn){
			window.location.replace("/profile")
		}
	}

	toggle = () => {
		this.setState(prevState => ({
			modal: !prevState.modal
		}));
	}

	render(){
		const { email, password, isLoading } = this.state;
		let fbLabel = (<label className="ml-2">Login with Facebook</label>)

		return (
			<div>
				{this.authenticated()}
				{/* Preloader */}
				<div className="preloader d-flex align-items-center justify-content-center">
					<div className="lds-ellipsis">
						<div />
						<div />
						<div />
						<div />
					</div>
				</div>
				<header className="header-area">
					<TopHeader />
					<Navbar />
				</header>
				{ !isLoading ? (
					<div className="login-area section-padding-100">
					  <div className="container">
					    <div className="row justify-content-center">
					      <div className="col-12 col-lg-6 col-md-8 col-sm-12">
					        <div className="login-content">
					          {/* Section Title */}
					          <div className="section-heading">
					          	<img src={require('Components/logo.png')} alt="..." style={{width:'150px'}}/>
					            <h4>WHERE2GO</h4>
					          </div>
					          <form onSubmit={this.submitHandler} method="post">
					            <div className="form-group">
					              <Input placeholder="Email" type="text" name="email" onChange={this.changeHandler} value={email} required></Input>
					            </div>
					            <div className="form-group">
					              <Input placeholder="Password" type="password" name="password" onChange={this.changeHandler} value={password} required></Input>
					            </div>
					            <div className="form-group">
					                <label onClick={this.toggle}>Create account</label>
					                <a href="!#"  className="pull-right">Forgot password?</a>
					            </div>
					            <div className="justify-content-center">
						            <button type="submit" className="btn vizew-btn w-100 mt-20 mb-4">Login</button>
						            <h6 align="center">- OR -</h6>
						            <FacebookLogin appId="597985960733962" SameSite="None" fields="name,email,picture" onClick={this.componentClicked} callback={this.responseFacebook} 
									cssClass="btn fb-btn w-100 mt-3" icon="fa-facebook" textButton={fbLabel}/> 
					            </div>
					          </form>
					          <Signup modal={this.state.modal} openModal={this.toggle}/>
					        </div>
					      </div>
					    </div>
					  </div>
					</div>
				):(
					<div className="d-flex align-items-center justify-content-center  mt-100 mb-100">
						<img src={require('Components/img/test.gif')} alt="..."/>
					</div>
				)}
				{/* ##### Login Area End ##### */}
			<Footer />
			</div>
		)
	}
}

export default Login;