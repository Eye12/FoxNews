import './styles/css/happy_moment.css';
import React from 'react';

import {
	Row,
	Col
} from 'antd';

// 引入其他内部文件
import Header from './components/pc/pc_header.js';
import Footer from './components/common/footer.js';
import Modal from './components/common/modal.js';

class Easy extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			fetchData: []
		}
	}

	componentDidMount() {
		fetch('https://route.showapi.com/107-32?showapi_appid=58445&showapi_sign=2dd95b7b07474e48ad9d1e457d0f63e0')
			.then(res => res.json())
			.then(data => {
				this.setState({
					fetchData: data.showapi_res_body.list
				})
			})
	}

	render() {
		let fetchData = this.state.fetchData;
		let itemsContent = fetchData.slice(0, 10).map((item, index) => {
			return (<div className="card-item" key={index}>
							<h2 className="title">{item.title}</h2>
							<p className="content">{item.content}</p>
						</div>)
		})

		return (
			<div className="easy-moment">
				<Header currentkey='happy'></Header>

				<Row>
					<Col span={5}></Col>
					<Col span={14}>
						{itemsContent}
					</Col>
					<Col span={5}></Col>
				</Row>


				<Footer></Footer>
				<Modal></Modal>
			</div>
		)
	}
}

export default Easy;