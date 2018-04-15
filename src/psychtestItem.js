import React from 'react';

import {
	Row,
	Col
} from 'antd';

// 引入其他内部文件
import Header from './components/pc/pc_header.js';
import Footer from './components/common/footer.js';

class PsychtestItem extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			fetchData: '',
		}
	}

	componentDidMount() {
		let item = localStorage.getItem('item');
		fetch('https://route.showapi.com/970-2?id=' + item + '&showapi_appid=58445&showapi_sign=2dd95b7b07474e48ad9d1e457d0f63e0')
			.then(res => res.json())
			.then(data => {
				this.setState({
					fetchData: data.showapi_res_body.item.content
				})
			})
	}

	render() {
		return (
			<div className="psychest-item">
				<Header currentkey='psychtest'></Header>
				<Row className="content">
					<Col span={2}></Col>
					<Col span={20}>
						<Col span={3}></Col>
						<Col span={18}>
							<div className="innerContent" dangerouslySetInnerHTML={{
        __html: this.state.fetchData
      }}></div>
						</Col>
						<Col span={3}></Col>
					</Col>
					<Col span={2}></Col>
				</Row>
				<Footer></Footer>
			</div>
		)
	}
}

export default PsychtestItem;