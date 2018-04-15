import '../../styles/css/pc_header.css';
import React from 'react';
import Pubsub from 'pubsub-js';
import {
	Link
} from 'react-router-dom';
import {
	Row,
	Col,
	Menu,
	Icon
} from 'antd';
const MenuItem = Menu.Item;


class PC_Header extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			current: this.props.currentkey,
			isLogin: false,
			localData: ''
		}
	}



	checkLocalStorage = (e) => {
		var localData = JSON.parse(localStorage.getItem('foxNewsData'));
		if (localData) {
			this.setState({
				localData: localData,
				isLogin: true
			});
		} else {
			return
		}
	}

	componentWillMount() {
		this.checkLocalStorage();
	}
	componentDidMount() {
		Pubsub.subscribe('LOGIN', (msg, data) => {
			this.setState({
				isLogin: data
			})
		})
	}

	// 需要登录打开模态框
	loginHandler = (e) => {
		Pubsub.publish('OPEN', true);
	}

	// 退出登录修改登录状态
	logoutHandler = (e) => {
		this.setState({
			isLogin: false
		})
	}

	render() {
		var localData = this.state.localData;
		// 修改Header icon颜色
		let styleArr = [];
		const keyArr = ['hot-news', 'healthy', 'constellation', 'psychtest', 'happy', 'oil-price'];
		keyArr.forEach((item, index) => {
			if (this.state.current == item) {
				styleArr[index] = {
					color: 'red'
				}
			} else {
				styleArr[index] = {}
			}
		});

		// 用户是否登录判断
		let isLogContent = this.state.isLogin ? (<div id="register-login">
							<span className='log-text'>{localData.user}</span>
							<Icon type="logout" className='logout' onClick={ this.logoutHandler }/>
						</div>) : (<div id="register-login" onClick={ this.loginHandler }>
							<Icon type="login" className='login' />
							<span className='log-text'>注册/登录</span>
						</div>);


		return (
			<div id="pc-header">
				<Row>
					{ /*左留白*/ }
					<Col span={2}></Col>
					{ /*site logo*/ }
					<Col span={3}>
						<img src={require('../../images/healthy.svg')} alt="logo.svg" id="header-logo"/>
						<span id="site-titel">FoxNews</span>
					</Col>
					<Col span={14}>
						<Menu id="header-menu" mode='horizontal' selectedKeys={[this.state.current]}>
							<MenuItem key='hot-news'>
								<Link to='/' target='_blank'><Icon type='notification' style={styleArr[0]}/> <span style={styleArr[0]}>周热搜</span></Link>
	  						</MenuItem>
							<MenuItem key='healthy'>
								<Link to='/healthy' target='_blank'><Icon type='medicine-box' style={styleArr[1]}/> <span style={styleArr[1]}>健康</span></Link>
							</MenuItem>
							<MenuItem key='constellation'>
								<Link to='/constellation' target='_blank'><Icon type="star-o" style={styleArr[2]} /> <span style={styleArr[2]}>星座</span></Link>
							</MenuItem>
							<MenuItem key='psychtest'>
								<Link to='/psychtest' target='_blank'><Icon type="heart-o" style={styleArr[3]} /> <span style={styleArr[3]}>心理测试</span></Link>
							</MenuItem>
							<MenuItem key='happy'>
								<Link to='/happy' target='_blank'><Icon type="smile-o" style={styleArr[4]} /> <span style={styleArr[4]}>轻松点</span></Link>
							</MenuItem>
							<MenuItem key='oil-price'>
								<Link to='/oil' target='_blank'><Icon type="eye-o" style={styleArr[5]} /> <span style={styleArr[5]}>今日油价</span></Link>
							</MenuItem>
						</Menu>
					</Col>
					<Col span={3}>
						{ isLogContent }
					</Col>
					{ /*右留白*/ }
					<Col span={2}></Col>
				</Row>
			</div>
		)
	}
}

export default PC_Header;


if (module.hot) {
	module.hot.accept();
}