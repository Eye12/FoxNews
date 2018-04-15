import './styles/css/oil.css';
import React from 'react';
// 引入其他内部文件
import Header from './components/pc/pc_header.js';
import Footer from './components/common/footer.js';
import Modal from './components/common/modal.js';
import {
	Row,
	Col,
	Input
} from 'antd';
const Search = Input.Search;


class Oil extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			city: '',
			fetchData: []
		}
	}

	searchHandler = (value) => {
		this.setState({
			city: value
		})
		fetch('https://route.showapi.com/138-46?showapi_appid=58445&showapi_sign=2dd95b7b07474e48ad9d1e457d0f63e0&prov=' + value)
			.then(res => res.json())
			.then(data => {
				this.setState({
					fetchData: data.showapi_res_body.list
				})
			})
	}

	render() {
		let fetchData = this.state.fetchData;
		let listContent = fetchData.map((item, index) => {
			return (<ul className="info-list" key={index}>
    							<li>p89: {item.p89}</li>
    							<li>p90: {item.p90}</li>
    							<li>p92: {item.p92}</li>
    							<li>p93: {item.p93}</li>
    							<li>p95: {item.p95}</li>
    							<li>p97: {item.p97}</li>
    						</ul>)
		})
		let infoCardClassName = this.state.city.length ? 'info-card' : 'hidden';
		return (
			<div className="page-oil">
				<Header currentkey='oil-price'></Header>
				<Row>
					<Col span={5}></Col>
					<Col span={14}>
						<div className='search-container'>
    						<Search placeholder="请输入您要查询的城市名称" onSearch={this.searchHandler} enterButton />
  						</div>
  						<div className={infoCardClassName}>
    						<h2 className='city-title'>{this.state.city}</h2>
    						{listContent}
    					</div>
					</Col>
					<Col span={5}></Col>
				</Row>
				<Footer></Footer>
				<Modal></Modal>
			</div>
		)
	}
}

export default Oil;