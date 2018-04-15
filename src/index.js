import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import registerServiceWorker from './registerServiceWorker';
import {
	HashRouter as Router,
	Route,
	Switch,
	Link
} from 'react-router-dom';

import MediaQuery from 'react-responsive';
// 引入其他内部文件
import Home from './home.js';
import Detail from './detail.js';
import Healthy from './healthy.js';
import HealthyDetails from './healthyDetails.js';
import Constellation from './constellation.js';
import Psychtest from './psychtest.js';
import PsychtestItem from './psychtestItem.js';
import Happy from './happy_moment.js';
import Oil from './oil.js';

import MB_Header from './components/mobile/mb_header.js';
import MB_Content from './components/mobile/mb_content.js';
import Footer from './components/common/footer.js';
import Modal from './components/common/modal.js';
import MB_Details from './components/mobile/mb_details.js';
import MB_Psychology_Content from './components/mobile/mb_psychology_content.js';
class MB_Container extends React.Component {
	render() {
		return (
			<div className="mb-container">
				<MB_Header />
				<MB_Content />
				<Footer />
				<Modal />
			</div>
		)
	}
}

class MB_Details_Container extends React.Component {
	render() {
		return (
			<div className="detail-container">
				<MB_Header />
				<MB_Details />
				<Footer />
				<Modal />
			</div>
		)
	}
}

class MB_Psychology_Container extends React.Component {
	render() {
		return (
			<div className="psychology-content">
				<MB_Header />
				<MB_Psychology_Content />
				<Footer />
				<Modal />
			</div>
		)
	}
}



class GlobalContainer extends React.Component {
	render() {
		return (
			<div className="global-container">
				{ /*pc端*/ }
				<MediaQuery query="(min-device-width: 1224px)">
					<Router>
						<Switch>
							<Route exact path='/' component={Home}></Route>
							<Route path='/detail' component={Detail}></Route>
							<Route path='/healthy' component={Healthy}></Route>
							<Route path='/healthyDetails' component={HealthyDetails}></Route>
							<Route path='/constellation' component={Constellation}></Route>
							<Route path='/psychtest' component={Psychtest}></Route>
							<Route path='/psychtestItem' component={PsychtestItem}></Route>
							<Route path='/happy' component={Happy}></Route>
							<Route path='/oil' component={Oil}></Route>
						</Switch>
					</Router>
    			</MediaQuery>
				{ /*手机端*/ }
				<MediaQuery query="(max-device-width: 1224px)">
					<Router>
						<Switch>
							<Route exact path='/' component={MB_Container}></Route>
							<Route path='/details' component={MB_Details_Container}></Route>
							<Route path='/psychologyContent' component={MB_Psychology_Container}></Route>
						</Switch>
					</Router>
    			</MediaQuery>
			</div>

		)
	}
}

ReactDOM.render(<GlobalContainer />, document.getElementById('root'));
registerServiceWorker();