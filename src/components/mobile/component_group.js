import '../../styles/css/mb_group.css';
import React from 'react';

import {
	Link
} from 'react-router-dom';

class Group extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			fetchData: []
		}
	}

	componentDidMount() {
		let urlsMap = {
			hot: 'https://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type=guoji&count=20',
			healthy: 'https://route.showapi.com/96-109?showapi_appid=58445&showapi_sign=2dd95b7b07474e48ad9d1e457d0f63e0',

		}
		let urlsMapkey = this.props.urlsMapkey;
		if (urlsMapkey == 'hot') {
			fetch(urlsMap.hot)
				.then(res => res.json())
				.then(data => {
					this.setState({
						fetchData: data
					})
				})
		} else if (urlsMapkey == 'healthy') {
			fetch(urlsMap.healthy)
				.then(res => res.json())
				.then(data => {
					this.setState({
						fetchData: data.showapi_res_body.pagebean.contentlist
					})
				})
		}
	}

	clickHandler = (e) => {
		localStorage.setItem('uniquekey', e.target.getAttribute('datakey'));
	}


	render() {
		let fetchData = this.state.fetchData;
		let groupContent = fetchData.length ? fetchData.map((item, index) => {
			let uniquekey = item.uniquekey;
			return (<Link to='/details' key={index} onClick={this.clickHandler}><div className="mb-group">
				<div className="left">
					<img src={this.props.urlsMapkey == 'hot' ? item.thumbnail_pic_s : item.img} alt="img" datakey={this.props.urlsMapkey == 'hot' ? item.uniquekey : item.id}/>
				</div>
				<div className="right">
					<h3 className="title" datakey={this.props.urlsMapkey == 'hot' ? item.uniquekey : item.id}>{ item.title }</h3>
					<p><span className="author" datakey={this.props.urlsMapkey == 'hot' ? item.uniquekey : item.id}>{this.props.urlsMapkey == 'hot' ? item.author_name : item.author }</span><span className="time" datakey={item.uniquekey}>{this.props.urlsMapkey == 'hot' ? item.date : item.time }</span></p>
				</div>
			</div></Link>)
		}) : '数据努力加载中...';



		return (
			<div>
				{ groupContent }
			</div>
		)
	}
}

export default Group;