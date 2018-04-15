import React from 'react';



class MB_Psychology_Content extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			fetchData: ''
		}
	}

	componentDidMount() {
		let id = localStorage.getItem('id');
		fetch('https://route.showapi.com/970-2?showapi_appid=58445&showapi_sign=2dd95b7b07474e48ad9d1e457d0f63e0&id=' + id)
			.then(res => res.json())
			.then(data => {
				this.setState({
					fetchData: data.showapi_res_body.item.content
				})
			})
	}

	render() {

		return (
			<div className="mb-psychology-content">
				<p dangerouslySetInnerHTML={{
        __html: this.state.fetchData
      }}></p>
			</div>
		)
	}
}

export default MB_Psychology_Content;