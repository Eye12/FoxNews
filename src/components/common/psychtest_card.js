import '../../styles/css/py_card.css';
import React from 'react';

import {
	Link
} from 'react-router-dom';

class Py_card extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			fetchData: []
		}
	}

	componentDidMount() {
		fetch('https://route.showapi.com/970-1?showapi_appid=58445&showapi_sign=2dd95b7b07474e48ad9d1e457d0f63e0&page=' + this.props.pageNumb)
			.then(res => res.json())
			.then(data => {
				this.setState({
					fetchData: data.showapi_res_body.pagebean.contentlist
				})
			})
	}

	handleClick = (e) => {
		localStorage.setItem('item', e.target.getAttribute('datakey'));
	}

	render() {
		let fetchData = this.state.fetchData;
		let rightListContent = fetchData.length ? fetchData.map((item, index) => {
			return (<li key={index}><Link onClick={this.handleClick} to='/psychtestItem' target='_blank' datakey={item.id}>● {item.title}</Link></li>)
		}) : '没有加载到数据';

		let imgPath = require('../../images/psychtest/' + this.props.img + '.jpg');
		return (
			<div className="py-card">	
				<div className="left-img">
					<img src={imgPath} alt="img"/>
				</div>
				<ul className="right-list">
					{rightListContent}
				</ul>
			</div>
		)
	}
}

export default Py_card;