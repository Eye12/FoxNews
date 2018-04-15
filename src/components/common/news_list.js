import '../../styles/css/news_list.css';
import React from 'react';
import {
	Link
} from 'react-router-dom';

class News_list extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			dataArr: []
		}
	}

	componentWillMount() {
		fetch('https://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type=' + this.props.type + '&count=' + this.props.count).then(data => data.json()).then(data => {
			this.setState({
				dataArr: data
			})
		})
	}

	clickHandler = (e) => {
		let datakey = e.target.getAttribute('datakey');
		localStorage.setItem('uniquekey', datakey);
		localStorage.setItem('currentkey', 'hot-news');
	}

	render() {
		let dataArr = this.state.dataArr;
		let listContent = dataArr.length ? dataArr.map((item, index) => {
			return <li key={item.uniquekey}><Link datakey={item.uniquekey} onClick={ this.clickHandler } to={{
          pathname: '/detail',
          query: {
            uniquekey: item.uniquekey,
            currentkey: 'hot-news'
          }
        }} target='_blank'>{item.title}</Link></li>
		}) : '没有加载到数据';


		return (
			<div className="news-list">
				<h3 className="header">{ this.props.title }</h3>
				<ul className="list">
					{ listContent }
				</ul>
			</div>
		)
	}
}

export default News_list;