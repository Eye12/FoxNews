import '../src/styles/css/healthy.css';
import React from 'react';

import {
	Row,
	Col,
	Carousel,
} from 'antd';

import {
	Link
} from 'react-router-dom';


// 引入其他内部文件
import Header from './components/pc/pc_header.js';
import DataList from './components/common/data_list.js';
import Footer from './components/common/footer.js';
import Modal from './components/common/modal.js';

class Healthy extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			fetchData: [],
			itemData: ''
		}
	}

	componentDidMount() {
		fetch('https://route.showapi.com/96-109?showapi_appid=58445&showapi_sign=2dd95b7b07474e48ad9d1e457d0f63e0')
			.then(data => data.json())
			.then(data => {
				this.setState({
					fetchData: data.showapi_res_body.pagebean.contentlist
				})
			});

		fetch('https://route.showapi.com/96-36?showapi_appid=58445&showapi_sign=2dd95b7b07474e48ad9d1e457d0f63e0&id=011658')
			.then(data => data.json())
			.then(data => {
				this.setState({
					itemData: data.showapi_res_body.item.content
				})
			})

	}

	handleClick = (e) => {
		let datakey = e.target.getAttribute('datakey');
		localStorage.setItem('id', datakey);
		console.log(datakey);
	}

	render() {
		let fetchData = this.state.fetchData;
		let carouselContent = fetchData.length ? fetchData.slice(9, 13).map((item, index) => {
			return (<Link to='/healthyDetails' target='_blank' onClick={this.handleClick}><img src={item.img} alt="imgs" className="imgs" key={item.id} datakey={item.id} /></Link>)
		}) : '网络超时，没有加载到任何数据！';

		let rightListContent = fetchData.length ? fetchData.slice(4, 20).map((item, index) => {
			return (<Link to='/healthyDetails' target='_blank' key={item.id}><li className='list-li' datakey={item.id}>● {item.title}</li></Link>);
		}) : '网络超时，没有加载到任何数据！';

		let itemData = this.state.itemData;
		let itemContent = itemData.length ? (<p>{itemData}</p>) : '网络超时,没有加载到数据！';

		return (
			<div className="healthy">
				<Header currentkey='healthy'></Header>
				<div className="content">
					<Row>
						<Col span={2}></Col>
						<Col span={20}>
							<Carousel>
    							<div className="group">{carouselContent[0]}</div>
    							<div className="group">{carouselContent[1]}</div>
    							<div className="group">{carouselContent[2]}</div>
    							<div className="group">{carouselContent[3]}</div>
  							</Carousel>
  							<Col span={12}>
  								<div className="left">
  									<h2 className="header">健康资讯</h2>
  									<DataList></DataList>
  								</div>
  							</Col>
  							<Col span={12}>
  								<div className="right">
  									<h2 className="header">热门话题</h2>
  									<ul className="right-list">
  										{ rightListContent }
  									</ul>
  								</div>
  							</Col>
  							<div className="clear"></div>
  							<div className="item-info">
  								<h2 className="header">疾病资讯</h2>
  								{itemContent}
  							</div>
						</Col>
						<Col span={2}></Col>
					</Row>
				</div>
				<Footer></Footer>
				<Modal />
			</div>
		)
	}
}

export default Healthy;