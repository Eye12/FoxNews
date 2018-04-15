import '../../styles/css/pc_hot_content.css';
import React from 'react';
import {
	Row,
	Col,
	Carousel
} from 'antd';


// 引入其他内部组件
import News_list from '../common/news_list.js';
import Imgs_block from '../common/imgs_block.js';


class PC_Hot_content extends React.Component {
	render() {
		const styleObj = {
			paddingTop: 0,
			paddingRight: 0,
			paddingLeft: '8px'
		}

		return (
			<div className="pc-hot-content">
				<Row>
					<Col span={2}></Col>
					<Col span={20}>
						<Col span={10}>
							<Carousel>
    							<a href="http://news.china.com/domestic/945/20180409/32292007.html" target='_blank'>
    								<img src={ require('../../images/carousel/001.jpg') } alt="img" id="item-1" className='carousel-imgs' />
    							</a>
    							<a href="http://news.china.com/socialgd/10000169/20180409/32291953.html" target='_blank'>
    								<img src={ require('../../images/carousel/002.jpg') } alt="img" id="item-2" className='carousel-imgs' />
    							</a>
    							<a href="http://news.ifeng.com/a/20180409/57417593_0.shtml?_zbs_baidu_news#p=1" target='_blank'>
    								<img src={ require('../../images/carousel/003.jpg') } alt="img" id="item-3" className='carousel-imgs' />
    							</a>
    							<a href="http://xinwen.eastday.com/a/n180409135915424.html?qid=news.baidu.com" target='_blank'>
    								<img src={ require('../../images/carousel/004.jpg') } alt="img" id="item-4" className='carousel-imgs' />
    							</a>
  							</Carousel>
  							<Imgs_block type='shehui' count='10' title='社会新闻' wd='49%' heit='60px' fs='.8rem'></Imgs_block>
						</Col>
						<Col span={14}>
							<News_list type='guonei' count='48' title='国际头条'></News_list>
						</Col>
						<div className='clear'></div>
  						<Imgs_block type='yule' count='6' title='娱乐新闻' wd='32.66667%' style={styleObj} heit='50px' fs='.95rem'></Imgs_block>
					</Col>
					<Col span={2}></Col>
				</Row>
			</div>
		)
	}
}

export default PC_Hot_content;