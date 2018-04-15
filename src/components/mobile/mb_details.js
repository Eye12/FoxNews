import '../../styles/css/mb_details.css';
import React from 'react';

class MB_Details extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			fetchData: [],
			onOff: ''
		}
	}

	componentDidMount() {
		let uniquekey = localStorage.getItem('uniquekey');
		if (uniquekey.length !== 6) {
			this.setState({
				onOff: 1
			})

			fetch('https://newsapi.gugujiankong.com/Handler.ashx?action=getnewsitem&uniquekey=' + uniquekey)
				.then(res => res.json())
				.then(data => {
					this.setState({
						fetchData: data
					})
				})
		} else {
			this.setState({
				onOff: 2
			})

			fetch('https://route.showapi.com/96-36?showapi_appid=58445&showapi_sign=2dd95b7b07474e48ad9d1e457d0f63e0&id=' + uniquekey)
				.then(res => res.json())
				.then(data => {
					this.setState({
						fetchData: data.showapi_res_body.item
					})
				})
		}

	}

	render() {
		let fetchData = this.state.fetchData;
		let onOff = this.state.onOff;
		console.log(onOff);

		if (onOff == '1') {
			return (
				<div className="mb-details">
				<p dangerouslySetInnerHTML={{
          __html: fetchData.pagecontent
        }}></p>
			</div>
			)
		} else {
			return (<div className='mb-details'>
					<div className="header">
						<h2 className="title">{fetchData.title}</h2>
						<p className='title-info'><span className="author">{fetchData.author}</span><span className="time">{fetchData.time}</span></p>
					</div>

					<div className="content">
						<img src={fetchData.img} alt="img"/>
						<p>{fetchData.content}</p>
					</div>
				</div>)
		}
	}
}

export default MB_Details;