import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import MovieCard from '../movieCard/MovieCard';
import './MovieGrid.css'

class MovieGrid extends React.Component {
    render() {
        return (
            <React.Fragment>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1, mb: 2 }} color="primary">
                    { this.props.title }
                </Typography>
                <Grid container spacing={3.75}>
                    {this.props.moviesList &&
                        this.props.moviesList.sort((a, b) => b.popularity - a.popularity).map((movie) => 
                        <Grid item className="grid_item__centerMobile" key={ movie.id }>
                            <MovieCard movie={ movie } />
                        </Grid>
                        )
                    }
                    {this.props.moviesList.length === 0 &&
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1, mt: 5, textAlign: 'center' }} color="primary">
                            No results
                        </Typography>
                    }
                </Grid>
            </React.Fragment>
        );
    }
}

export default MovieGrid;

MovieGrid.propTypes = {
    title: PropTypes.string,
    moviesList: PropTypes.array
};