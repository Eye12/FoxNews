import '../../styles/css/card.css';
import React from 'react';
import Pubsub from 'pubsub-js';

class SingleCard extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			fetchData: ''
		}
	}

	componentDidMount() {
		let url = '/constellation/getAll?consName=' + this.props.constellation + '&type=month&key=36a82ec93d011b6eade04482d2ad6a52';
		fetch(url).then(data => data.json()).then(data => {
			this.setState({
				fetchData: data
			})
			Pubsub.publish('DATE', data.date);
		})


	}
	render() {
		let fetchData = this.state.fetchData;
		let borderStyle = this.props.border ? ({
			borderLeft: '1px dotted rgba(0,0,0,.1)',
			borderRight: '1px dotted rgba(0,0,0,.1)',
		}) : {};
		let imgUrl = require('../../images/constellation/' + this.props.index + '.png');
		return (
			<div className="single-card" style={borderStyle}>
				<div className="left">
					<div className="gp">
						<img src={imgUrl} alt="img"/>
						<h5>{this.props.constellation}</h5>
					</div>
				</div>
				<div className="right">
					<dl className='healthy'>
						<dt>健康</dt>
						<dd>{fetchData.health}</dd>
					</dl>
					<dl className='love'>
						<dt>恋爱</dt>
						<dd>{fetchData.love}</dd>
					</dl>
					<dl className='money'>
						<dt>财运</dt>
						<dd>{fetchData.money}</dd>
					</dl>
					<dl className='word'>
						<dt>工作</dt>
						<dd>{fetchData.work}</dd>
					</dl>

				</div>
			</div>
		)
	}
}

export default SingleCard;