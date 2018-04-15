import React from 'react';

// 引入其他内部文件
import Header from './components/pc/pc_header.js';
import Content from './components/common/content.js';
import Footer from './components/common/footer.js';

class Detail extends React.Component {
	render() {

		return (
			<div className="detail">
				<Header currentkey='hot-news'></Header>
				<Content></Content>
				<Footer></Footer>
			</div>
		)
	}
}

export default Detail;