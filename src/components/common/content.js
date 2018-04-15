import '../../styles/css/content.css';
import React from 'react';
import {
	Row,
	Col
} from 'antd';

class Content extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			contentData: ''
		}
	}

	componentDidMount() {
		let uniquekey = localStorage.getItem('uniquekey');

		fetch('https://newsapi.gugujiankong.com/Handler.ashx?action=getnewsitem&uniquekey=' + uniquekey)
			.then(data => data.json())
			.then(data => {
				this.setState({
					contentData: data.pagecontent
				})
			})
	}

	render() {
		return (
			<Row className="content">
				<Col span={2}></Col>
				<Col span={20}>
					<div className="dataContent" dangerouslySetInnerHTML={{
        __html: this.state.contentData
      }}></div>
				</Col>
				<Col span={2}></Col>
			</Row>
		)
	}
}

export default Content;