import React from 'react';
import spinner from './spinner.gif'

export default () => {
	return (
		<React.Fragment>
			<img src={spinner} alt="Loading..." style={{ 	
				width: '100px',
				margin: '40px auto',
				display: 'block'
			}}/>
		</React.Fragment>
	)
}
