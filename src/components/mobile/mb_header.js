import '../../styles/css/mb_header.css';
import React from 'react';
import {
	Icon
} from 'antd';
import Pubsub from 'pubsub-js';

class MB_Header extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isLogin: false,
			localData: ''
		}
	}

	componentWillMount() {
		let localData = JSON.parse(localStorage.getItem('foxNewsData'));
		if (localData) {
			this.setState({
				localData: localData,
				isLogin: true
			});
		} else {
			return
		}

		Pubsub.subscribe('LOGIN', (msg, data) => {
			this.setState({
				isLogin: data
			})
		})
	}

	logoutHandler = (e) => {
		this.setState({
			isLogin: false
		})
	}

	loginHandler = (e) => {
		Pubsub.publish('OPEN', true)
	}

	render() {
		let localData = this.state.localData;
		let rightContent = this.state.isLogin ? (<div id="right">
					<span id='logout-txt'>{localData.user}</span>
					<Icon type="logout" className='icn-out' onClick={this.logoutHandler}/>
				</div>) : (<div id="right" onClick={this.loginHandler}>
					<Icon type="login" className='icn-in' />
					<span>注册登录</span>
				</div>);

		return (
			<div id="mb-header">
				<div id="left">
					<img src={require('../../images/healthy.svg')} alt="logo.svg" />
					<span id='text'>FoxNews</span>
				</div>
				{ rightContent }
			</div>
		)
	}
}

export default MB_Header;