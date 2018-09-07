import React, { Component } from 'react';
import axios from 'axios';

const Context = React.createContext();


const reducer = (state, action) => {
	switch (action.type) {
    case "SEARCH_TRACKS":
      return { ...state, trackList: action.payload, heading: "Search Results" };

    case "SEARCH_START":
      return { ...state, searching: true };
    case "SEARCH_END":
      return { ...state, searching: false };

    default:
      return state;
  }
}

export class Provider extends Component {
	state = {
		trackList: [],
		heading: 'Top 10 Tracks',
		searching: false,
		dispatch: action => this.setState(state => reducer(state, action))
	}

	componentDidMount() {
		this.setState({searching: true});
		axios
      .get(`
			https://cors-anywhere.herokuapp.com/
			http://api.musixmatch.com/ws/1.1/
			chart.tracks.get?page=1&page_size=10&country=us&f_has_lyrics=1
			&apikey=${process.env.REACT_APP_MM_KEY}
		`)
      .then(res => {
				// console.log(res.data);
				this.setState({trackList: res.data.message.body.track_list, searching: false});
			})
      .catch(err => console.log(err));
	}

	render() {
		return (
			<Context.Provider value={this.state}>
				{this.props.children}
			</Context.Provider>
		)
	}
}

export const Consumer = Context.Consumer;
