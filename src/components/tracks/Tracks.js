import React, { Component } from 'react';
import { Consumer } from '../../context';
import Spinner from '../layout/Spinner';
import Track from './Track';

class Tracks extends Component {
	render() {
		return (
			<Consumer>
				{ ({ trackList, heading, searching }) => {
					console.log(trackList);
					const tracks = (
						<React.Fragment>
							<h3 className="text-center mb-4">{heading}</h3>
							<div className="row">
								{trackList.map(item => (
									<Track key={item.track.track_id} track={item.track} />
								))}
							</div>
						</React.Fragment>
					);
					return !searching ? tracks : <Spinner />;
				}}
			</Consumer>
		)
	}
}

export default Tracks;