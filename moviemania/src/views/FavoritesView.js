import React from 'react';
import { getDatabase, ref, onValue, off } from "firebase/database";
import { AuthContext } from '../context';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import MovieGrid from '../components/movie/movieGrid/MovieGrid';

class FavoritesView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            favoritesData: [],
            currentUserId: ''
        }
    }

    listenForChanges = () => {
        const db = getDatabase();
        const favRef = ref(db, `users/${this.state.currentUserId}/favorites/`);
        onValue(favRef, (snapshot) => {
        const data = snapshot.val();
        let tempArray = [];
        for (const key in data) {
            const item = data;
            tempArray.push(item[key].movie);
        }
        this.setState({ favoritesData: tempArray });
        });
    }

    static contextType = AuthContext;

    componentDidMount() {
        if (this.context.isLoggedIn) {
            this.setState({ currentUserId: this.context.userId }, () => {
                this.listenForChanges();
            });
        }
    }

    componentWillUnmount() {
        const db = getDatabase();
        const favRef = ref(db, `users/${this.state.currentUserId}/favorites/`);
        off(favRef);
    }

    render() {
        return (
            <Box sx={{ mt: 15, mb: 10 }}>
                <MovieGrid title="My Favorites" moviesList={ this.state.favoritesData } />
            </Box>
        );
    }
}

export default FavoritesView;

FavoritesView.propTypes = {
    onUpdateView: PropTypes.func.isRequired
}
