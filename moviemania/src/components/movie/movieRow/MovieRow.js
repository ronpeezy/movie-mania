import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import SwiperCore, { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.min.css';
import 'swiper/components/navigation/navigation.min.css'
import MovieCard from '../movieCard/MovieCard';
import './MovieRow.css';

SwiperCore.use([Navigation]);

const sliderBreakpoints = {
    320: {
      slidesPerView: 2,
      spaceBetween: 20
    },
    480: {
      slidesPerView: 3,
      spaceBetween: 30
    },
    640: {
      slidesPerView: 5,
      spaceBetween: 20
    },
    992: {
      slidesPerView: 6,
      spaceBetween: 20
    },
    1200: {
      slidesPerView: 6,
      spaceBetween: 30
    }
  }

class MovieRow extends React.Component {
    render() {
        return (
            <div style={{ marginTop: 60, marginBottom: 60 }}>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1, mb: 2 }} color="primary">
                    { this.props.title }
                </Typography>
                <Swiper
                spaceBetween={ 10 }
                slidesPerView={ 1 }
                breakpoints={ sliderBreakpoints }
                navigation={ true }
                >
                    {this.props.movies &&
                      this.props.movies.sort((a, b) => b.popularity - a.popularity).map((movie) => 
                        <SwiperSlide key={ movie.id }>
                          <MovieCard movie={ movie } />
                        </SwiperSlide>
                      )
                    }
                </Swiper>
            </div>
        );
    }
}

export default MovieRow;

MovieRow.propTypes = {
  title: PropTypes.string.isRequired,
  movies: PropTypes.array.isRequired
}