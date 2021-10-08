import React from 'react';
import PropTypes from 'prop-types';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import MovieDetail from '../movieDetail/MovieDetail';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import { grey } from '@mui/material/colors';
import { TheMovieDB } from '../../../util/TheMovieDB';

class MovieCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            openMovieDetail: false,
            movieDetail: {},
            previousMovieDetailId: 0
        }
    }

    handleOpen = () => {
        if (this.state.previousMovieDetailId !== this.props.movie.id) {
            TheMovieDB.GetDetails(this.props.movie.id).then(data => (
                this.setState({ movieDetail: data, previousMovieDetailId: this.props.movie.id }, () => {
                    this.setState({
                        openMovieDetail: true
                    })
                })
            ));
        } else {
            this.setState({
                openMovieDetail: true
            })
        }
        
    }

    handleClose = () => {
        this.setState({
            openMovieDetail: false
        })
    }

    render() {
        const APIIMAGEURL = 'https://image.tmdb.org/t/p/original';
        return (
            <React.Fragment>
                {this.props.movie &&
                    <Card sx={{ width: 167 }} onClick={ this.handleOpen }>
                        <CardActionArea disableRipple={ true }>
                            {this.props.movie['poster_path'] &&
                                <CardMedia
                                component="img"
                                height="250"
                                image={ APIIMAGEURL + this.props.movie['poster_path'] }
                                alt={ this.props.movie.title }
                                />
                            }
                            {!this.props.movie['poster_path'] &&
                                <CardContent sx={{ height: 250, background: grey[900] }}>
                                    <Typography variant="body2" style={{ color: '#ffffff', fontWeight: '500', textAlign: 'center'}}>
                                        { this.props.movie.title }
                                    </Typography>
                                </CardContent>
                            }
                        </CardActionArea>
                    </Card>
                }
                {this.state.openMovieDetail &&
                    <MovieDetail isOpen={ this.state.openMovieDetail } onCloseModal={ this.handleClose } movie={ this.state.movieDetail } />
                }
                {!this.props.movie &&
                    <Stack spacing={1}>
                        <Skeleton variant="rectangular" width={ 167 } height={ 250 } />
                    </Stack>
                }
            </React.Fragment>
        );
    }
}

export default MovieCard;

MovieCard.propTypes = {
    movie: PropTypes.object.isRequired
};