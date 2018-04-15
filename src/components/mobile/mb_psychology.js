import '../../styles/css/mb_psychology.css';
import React from 'react';
import {
	Link
} from 'react-router-dom';

class MB_Psychology extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			fetchData: []
		}
	}

	componentDidMount() {
		fetch('https://route.showapi.com/970-1?showapi_appid=58445&showapi_sign=2dd95b7b07474e48ad9d1e457d0f63e0&page=1')
			.then(res => res.json())
			.then(data => {
				this.setState({
					fetchData: data.showapi_res_body.pagebean.contentlist
				})
			})
	}

	clickHandler = (e) => {
		localStorage.setItem('id', e.target.getAttribute('datakey'));
	}

	render() {
		let fetchData = this.state.fetchData;
		let listContent = fetchData.length ? fetchData.map((item, index) => {
			return (<li key={index} onClick={this.clickHandler}><Link to='/psychologyContent' datakey={item.id}>● { item.title }</Link></li>)
		}) : '努力加载中...';


		return (
			<div className="mb-psychology">
				<img src={require('../../images/psychtest/mb_1.jpeg')} alt="img"/>
				<ul className="list">
					{listContent}
				</ul>
			</div>
		)
	}
}

export default MB_Psychology;