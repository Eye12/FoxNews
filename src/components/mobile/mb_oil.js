import '../../styles/css/mb_oil.css';
import React from 'react';

import {
	Input
} from 'antd';
const Search = Input.Search;

class MB_Oil extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			city: '',
			fetchData: []
		}
	}

	searchHandler = (values) => {
		this.setState({
			city: values
		})
		fetch('https://route.showapi.com/138-46?showapi_appid=58445&showapi_sign=2dd95b7b07474e48ad9d1e457d0f63e0&prov=' + values)
			.then(res => res.json())
			.then(data => {
				this.setState({
					fetchData: data.showapi_res_body.list
				})
			})
	}


	render() {
		let fetchData = this.state.fetchData;
		let cityOilContent = fetchData.length ? fetchData.map((item, index) => {
			return (<ul className="oil-list" key={index}>
					<li>p0: {item.p0}</li>
					<li>p89: {item.p89}</li>
					<li>p90: {item.p90}</li>
					<li>p92: {item.p92}</li>
					<li>p93: {item.p93}</li>
					<li>p95: {item.p95}</li>
					<li>p97: {item.p97}</li>
				</ul>)
		}) : '努力加载中...';

		return (
			<div className="mb-oil">
				<div className="ipt">
					<Search placeholder="请输入您要查询的城市，如:重庆" onSearch={this.searchHandler} enterButton/>
				</div>
				<div className={this.state.city == '' ? 'hidden' : 'city-oil'}>
					<h3 className="title">{this.state.city}</h3>
					{ cityOilContent }
				</div>
			</div>
		)
	}
}

export default MB_Oil;