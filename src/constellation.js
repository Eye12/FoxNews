import './styles/css/constellation.css';
import React from 'react';
import Pubsub from 'pubsub-js';
import path from 'path';
import {
	Row,
	Col
} from 'antd';
// 引入其他内部文件
import Header from './components/pc/pc_header.js';
import SingleCard from './components/common/card.js';
import Footer from './components/common/footer.js';
import Modal from './components/common/modal.js';

class Constellation extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			dateTime: '',
		}
	}


	componentDidMount() {
		Pubsub.subscribe('DATE', (msg, data) => {
			this.setState({
				dateTime: data
			})
		})
	}

	render() {

		return (
			<div className="constellation">
				<Header currentkey='constellation'></Header>
				<Row className="content">
					<Col span={2}></Col>
					<Col span={20}>
						<div className="title">
							<img src={require('./images/star.svg')} alt="star-img"/>
							<span>十二星座周运势</span><span className='sm'>{this.state.dateTime}</span>
						</div>
						<div className="card-group">
							<SingleCard constellation='白羊座' index='0'></SingleCard>
							<SingleCard constellation='金牛座' index='1' border='true'></SingleCard>
							<SingleCard constellation='双子座' index='2'></SingleCard>
						</div>
						<div className="card-group">
							<SingleCard constellation='巨蟹座' index='3'></SingleCard>
							<SingleCard constellation='狮子座' index='4' border='true'></SingleCard>
							<SingleCard constellation='处女座' index='5'></SingleCard>
						</div>
						<div className="card-group">
							<SingleCard constellation='天秤座' index='6'></SingleCard>
							<SingleCard constellation='天蝎座' index='7' border='true'></SingleCard>
							<SingleCard constellation='射手座' index='8'></SingleCard>
						</div>
						<div className="card-group">
							<SingleCard constellation='摩羯座' index='9'></SingleCard>
							<SingleCard constellation='水瓶座' index='10' border='true'></SingleCard>
							<SingleCard constellation='双鱼座' index='11'></SingleCard>
						</div>

					</Col>
					<Col span={2}></Col>
				</Row>
				<Footer></Footer>
				<Modal />
			</div>
		)
	}
}

export default Constellation;