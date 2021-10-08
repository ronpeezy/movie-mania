import React from 'react';
import PropTypes from 'prop-types'
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import './Search.css';
import { TheMovieDB } from '../../util/TheMovieDB';
import AppAlert from '../appAlert/AppAlert';

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchInput: '',
            previousSearchInput: '',
            previousSearchData: null,
            alertOpen: false,
            alertType: '',
            alertMsg: ''
        }
    }
    handleChange(e) {
        this.setState({ searchInput: e.target.value });
    }

    passSearchResults = (data, searchName) => {
        this.props.onSearchResults(data, searchName);
        this.props.onUpdateView('SearchResultsView');
    }

    search = () => {
        if (this.state.searchInput) {
            if (this.state.previousSearchInput !== this.state.searchInput) {
                TheMovieDB.Search(this.state.searchInput).then(data => (
                    this.setState({ previousSearchInput: this.state.searchInput, previousSearchData: data }, () => {
                        this.passSearchResults(data, this.state.searchInput);
                    })
                ));
            } else { this.passSearchResults(this.state.previousSearchData, this.state.searchInput); }
        } else { this.setAlert('error', 'Search must not be empty.'); }
    }

    setAlert = (alertType, alertMsg) => {
        this.setState({ 
            alertOpen: true,
            alertType: alertType,
            alertMsg: alertMsg
        });
    }

    handleCloseAlert = () => {
        this.setState({ 
            alertOpen: false
        });
    }

    render() {
        return (
            <Container sx={{ pt: 10 }}>
                <Box sx={{ my: 10, textAlign: 'center' }}>
                    <input className="search_input" placeholder="search movie..." value={ this.state.searchInput } onChange={ this.handleChange.bind(this) } />
                    <Button variant="cta" size="large" onClick={ this.search } id="searchbutton">search</Button>
                </Box>
                <AppAlert open={ this.state.alertOpen } alertType={ this.state.alertType } message={ this.state.alertMsg } onClose={ this.handleCloseAlert } />
            </Container>
        );
    }
}

export default Search;

Search.propTypes = {
    onUpdateView: PropTypes.func,
    onSearchResult: PropTypes.func
}