import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/system';
import MovieGrid from '../components/movie/movieGrid/MovieGrid';

class SearchResultsView extends React.Component {
    render() {
        return (
            <Box sx={{ mb: 10 }}>
                <MovieGrid title={ this.props.searchName } moviesList={ this.props.searchResults.results } />
            </Box>
        );
    }
}

export default SearchResultsView;

SearchResultsView.propTypes = {
    searchName: PropTypes.string.isRequired,
    searchResults: PropTypes.object
}
