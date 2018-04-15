import '../../styles/css/img_block.css';
import React from 'react';
import {
	Link
} from 'react-router-dom';

class Imgs_block extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			dataArr: []
		}
	}

	componentDidMount() {
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
		let groupStyle = {
			width: this.props.wd,
		}
		let smTitleStyle = {
			height: this.props.heit,
			fontSize: this.props.fs
		}
		let dataArr = this.state.dataArr;
		let listContent = dataArr.length ? dataArr.map((item, index) => {
			return (<div className="item-group" style={groupStyle} key={item.uniquekey}><Link to='/detail' target='_blank' onClick={this.clickHandler}><img src={item.thumbnail_pic_s} alt="img" className="imgs" datakey={item.uniquekey}/>
			<h4 datakey={item.uniquekey} className="sm-title" style={smTitleStyle}>{item.title}</h4></Link></div>)
		}) : '没有加载到数据';

		return (
			<div className="imgs-block">
				<h3 className="title">{this.props.title}</h3>
				<div className="imgs-list">
					{listContent}
					<div className="clear"></div>
				</div>
			</div>
		)
	}
}

export default Imgs_block;