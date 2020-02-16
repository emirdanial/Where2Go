import React from 'react';
import User from 'Utils/User.js';
import SavedPromoPanel from './SavedPromoPanel.js';
import MyPromoPanel from './MyPromoPanel.js';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

class TabPromo extends React.Component {
	render(){
		return(
			<div className="container">
				  <Tabs>
				    <TabList className="tab-profile">
				      <Tab className="profile-tab">My Promo ({User.promos})</Tab>
				      <Tab className="profile-tab">Saved Promo</Tab>
				    </TabList>
				    <TabPanel>
				    	<MyPromoPanel/>
				    </TabPanel>
				    <TabPanel>
				    	<SavedPromoPanel/>
				    </TabPanel>
				  </Tabs>
			</div>
		)
	}
}

export default TabPromo;