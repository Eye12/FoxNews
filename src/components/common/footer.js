import React from 'react';

class Footer extends React.Component {
	render() {
		let footerStyle = {
			width: '100%',
			height: 'auto',
			textAlign: 'center',
			fontSize: '.75rem',
			lineHeight: '38px'
		}

		return (
			<div id="footer" style={ footerStyle }>© 2018 FoxNews Reserved.</div>
		)
	}
}

export default Footer;