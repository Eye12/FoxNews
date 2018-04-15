import './styles/css/healthyDetails.css';
import React from 'react';

import {
	Row,
	Col
} from 'antd';


// 引入其他内部文件
import Header from './components/pc/pc_header.js';
import Footer from './components/common/footer.js';
class HealthyDetails extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			id: localStorage.getItem('id'),
			fetchData: ''
		}
	}

	componentDidMount() {

		fetch('https://route.showapi.com/96-36?showapi_appid=58445&showapi_sign=2dd95b7b07474e48ad9d1e457d0f63e0&id=' + this.state.id)
			.then(data => data.json())
			.then(data => {
				this.setState({
					fetchData: data.showapi_res_body.item
				})
			});

	}

	render() {
		let fetchData = this.state.fetchData;
		let detailContent = fetchData.length == '' ? '网络超时, 没有加载到任何数据！' : (<Col span={20}>
						<h2 className="title">{fetchData.title}</h2>
						<h5 className='sub-title'>
							<span className="author">{fetchData.author}</span>
							<span className="time">{fetchData.time}</span>
						</h5>
						<img src={fetchData.img} alt=""/>
						<p className="p-content">{fetchData.content}</p>
					</Col>);


		return (
			<div className="healthy-details">
				<Header currentkey='healthy'></Header>
				<div className="content">
					<Row>
						<Col span={2}></Col>
							{detailContent}
						<Col span={2}></Col>
					</Row>
				</div>
				<Footer></Footer>
			</div>
		)
	}
}

export default HealthyDetails;