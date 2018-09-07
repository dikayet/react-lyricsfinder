import React, { Component } from 'react';
import axios from 'axios';
import Moment from 'react-moment';

import { Link } from 'react-router-dom'
import Spinner from '../layout/Spinner';

class Lyrics extends Component {
	state = {
		track: {},
		lyrics: {}
	}

	componentDidMount(){
		axios
      .get(`
			https://cors-anywhere.herokuapp.com/
			http://api.musixmatch.com/ws/1.1/
			track.lyrics.get?track_id=${this.props.match.params.id}
			&apikey=${process.env.REACT_APP_MM_KEY}
		`)
      .then(res => {
        console.log(res.data);
				this.setState({ lyrics: res.data.message.body.lyrics.lyrics_body });
				return axios
					.get(`
						https://cors-anywhere.herokuapp.com/
						http://api.musixmatch.com/ws/1.1/
						track.get?track_id=${this.props.match.params.id}
						&apikey=${process.env.REACT_APP_MM_KEY}
					`)
			})
			.then(res => {
				// console.log(res.data);
				this.setState({
          track: res.data.message.body.track
        });
			})
      .catch(err => console.log(err));
	}

	render() {
		const { track, lyrics } = this.state;
		// console.log(track);
		if (
			track === undefined ||
			lyrics === undefined ||
			Object.keys(track).length === 0 ||
			lyrics.length === 0
		) {
      return <Spinner />;
    }
		return <React.Fragment>
        <Link to="/" className="btn btn-dark btn-sm mb-4">
          Go Back
        </Link>
        <div className="card">
          <h5 className="card-header">
            {track.track_name}
            <span className="text-secondary"> by </span>
            {track.artist_name}
          </h5>
          <div className="card-body">
            <p className="card-text">{lyrics}</p>
          </div>
        </div>

        <ul className="list-group mt-3">
          <li className="list-group-item">
            <strong>Album ID: {track.album_id}</strong>
          </li>
          <li className="list-group-item">
            <strong>
              Song Genre: { track.primary_genres.music_genre_list[0].music_genre
                  .music_genre_name }
            </strong>
          </li>
          <li className="list-group-item">
            <strong>
              Expicit Words: {track.explicit === 0 ? "No" : "Yes"}
            </strong>
          </li>
          <li className="list-group-item">
            <strong>
						Release Date: <Moment format="MM/DD/YYYY">{track.first_release_date}</Moment>
            </strong>
          </li>
        </ul>
      </React.Fragment>;
	}
}

export default  Lyrics;
