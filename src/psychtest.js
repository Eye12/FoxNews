import './styles/css/psychtest.css';
import React from 'react';

import {
	Row,
	Col
} from 'antd';

// 引入其他内部文件
import Header from './components/pc/pc_header.js';
import Footer from './components/common/footer.js';
import Py_card from './components/common/psychtest_card.js';
import Modal from './components/common/modal.js';

class Psychtest extends React.Component {
	render() {
		return (
			<div className="psychtest">
				<Header currentkey='psychtest'></Header>
				<div className="content">
					<Row>
						<Col span={2}></Col>
						<Col span={20}>
							<div className="part-one">
								<h2 className="title">心理测试</h2>
								<Col span={12}>
									<Py_card pageNumb='1' img='001'></Py_card>
								</Col>
								<Col span={12}>
									<Py_card pageNumb='3' img='002'></Py_card>
								</Col>
							</div>
						</Col>
						<Col span={2}></Col>
					</Row>
				</div>
				<Footer></Footer>
				<Modal></Modal>
			</div>
		)
	}
}

export default Psychtest;