import '../../styles/css/data_list.css';
import React from 'react';

import {
	Link
} from 'react-router-dom';

class DataList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			fetchData: []
		}
	}

	componentDidMount() {
		fetch('https://route.showapi.com/96-109?showapi_appid=58445&showapi_sign=2dd95b7b07474e48ad9d1e457d0f63e0')
			.then(data => data.json())
			.then(data => {
				this.setState({
					fetchData: data.showapi_res_body.pagebean.contentlist
				})
			})
	}

	clickHandler = (e) => {
		let datakey = e.target.getAttribute('datakey');
		localStorage.setItem('id', datakey);
	}

	render() {
		let fetchData = this.state.fetchData;
		let dataListContent = fetchData.length ? fetchData.slice(0, 5).map((item, index) => {
			return (<div className="data-list-group" key={item.id}>
					<Link to='/healthyDetails' target='_blank' onClick={this.clickHandler} className="left-img"><img src={item.img} alt="imgs" datakey={item.id}/></Link>
					<div className="details">
						<p className="title">{item.title}</p>
						<p className='span-group'><span className="author">{item.author}</span><span className="time">{item.time}</span></p>
					</div>
				</div>)
		}) : '网络超时，没有加载到您想要的数据！';

		return (
			<div className="data-list">
				{dataListContent}
			</div>
		)
	}
}

export default DataList;