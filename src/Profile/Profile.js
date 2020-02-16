import React from 'react';
import { auth } from 'Utils/Helpers.js';

import TopHeader from 'Components/TopHeader.js';
import Navbar from 'Components/Navbar.js';
import TabPromo from './TabPromo.js';
import ProfileHeader from './ProfileHeader';
import Footer from 'Components/Footer.js';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class Profile extends React.Component {
	render() {
		return(
			<div>
			<ToastContainer/>
				<header className="header-area">
					<TopHeader />
					<Navbar />
				</header>
				<section className="section-padding-50" style={{backgroundColor:'#191c1d'}} >
					<ProfileHeader />
				</section>
				<section className="section-padding-0-100 mt-4">
					<TabPromo />
				</section>
				<section>
					<Footer />
				</section>
			</div>
		)
	}
}

export default Profile;