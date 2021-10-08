import React from 'react';
import MovieRow from '../components/movie/movieRow/MovieRow';
import { TheMovieDB } from '../util/TheMovieDB';

class MoviesView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nowPlaying: [],
            topRated: [],
            popular: [],
            upcoming: []
        }
    }

    componentDidMount() {
        TheMovieDB.NowPlaying().then(data => ( 
            this.setState({ nowPlaying: data })
        ));
        TheMovieDB.TopRated().then(data => ( 
            this.setState({ topRated: data })
        ));
        TheMovieDB.Popular().then(data => ( 
            this.setState({ popular: data })
        ));
        TheMovieDB.Upcoming().then(data => ( 
            this.setState({ upcoming: data })
        ));
    }

    render() {
        return (
            <React.Fragment>
                <MovieRow title="Now Playing" movies={ this.state.nowPlaying } />
                <MovieRow title="Popular" movies={ this.state.popular } />
                <MovieRow title="Upcoming" movies={ this.state.upcoming } />
                <MovieRow title="Top Rated" movies={ this.state.topRated } />
            </React.Fragment>
        );
    }
}

export default MoviesView;