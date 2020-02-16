import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Home from './Home/Home.js';
import Login from './Login.js';
import Profile from './Profile/Profile.js';
import Promo from './Promo/Promo.js';
import EventGrid from './Event/EventGrid.js';
import ContestGrid from './Contest/ContestGrid.js';
import DealGrid from './Deal/DealGrid.js';
import SearchResult from 'Utils/SearchResult.js';
import EditProfile from './Profile/EditProfile.js';

class App extends React.Component {
	render(){
		return (
			<Router>
		    	<Switch>
		    		<Route path="/" exact component={Home} />
		    		<Route path="/login" component={Login} />
		    		<Route path="/profile" component={Profile} />
		    		<Route path="/edit-profile" component={EditProfile} />
					<Route path="/event" component={EventGrid} />
					<Route path="/contest" component={ContestGrid} />
					<Route path="/deals" component={DealGrid} />
		    		<Route path="/promo-:id" component={Promo} />
		    		<Route path="/search-:query" exact component={SearchResult}/>
		    		{/*<Route path="/event" component={Event} />*/}
					{/*<Route path="/contest-grid" component={ContestGrid} />*/}
					{/*<Route path="/deal-grid" component={DealGrid} />*/}
		    	</Switch>
		    </Router>
		)
	}
}


export default App;



