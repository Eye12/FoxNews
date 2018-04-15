import React from 'react';
import registerServiceWorker from './registerServiceWorker';


// 引入其他文件
import PC_Header from './components/pc/pc_header.js';
import Footer from './components/common/footer.js';
import Modal from './components/common/modal.js';
import PC_Hot_content from './components/pc/pc_hot_content.js';



class Home extends React.Component {
	render() {
		return (
			<div>
				<PC_Header currentkey='hot-news' />
				<PC_Hot_content />
				<Footer />
				<Modal />
			</div>
		)
	}
}


export default Home;
registerServiceWorker();

if (module.hot) {
	module.hot.accept();
}