import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { getDatabase, ref, child, get, set, remove } from "firebase/database";
import { AuthContext } from '../../../context';
import Modal from '@mui/material/Modal';
import { Box } from '@mui/system';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { CardActionArea } from '@mui/material';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import Grid from '@mui/material/Grid';
import CircleIcon from '@mui/icons-material/Circle';
import { grey, red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import theme from '../../../theme';
import Auth from '../../auth/Auth';

const style = {
  position: 'absolute',
  width: '100%',
  height: '100%',
  bgcolor: 'background.paper',
  p: 10,
  outline: 0,
  overflowY: 'scroll'
};

const circleStyles = {
  fontSize: 10, 
  margin: '0 8px'
}

function MovieDetail(props) {
  const contextType = useContext(AuthContext);

  const [currentUserId, setCurrentUserId] = useState('');

  const db = getDatabase();
  const dbRef = ref(db);
  const [favorite, setFavorite] = useState(false);
  const setFavoriteToDatabase = (userId) => {
    set(ref(db, 'users/' + userId + '/favorites/' + props.movie.id), {
      movie: props.movie
    })
    .then(() => {
      setFavorite(!favorite);
    })
    .catch((error) => {
      console.log(error.message);
    });
    
  }

  const toggleFavorite = () => {
    if (contextType.isLoggedIn) {
      get(child(dbRef, `users/${currentUserId}/favorites/${props.movie.id}`)).then((snapshot) => {
        if (snapshot.exists()) {
          const remRef = ref(db, `users/${currentUserId}/favorites/${props.movie.id}`);
          remove(remRef);
          setFavorite(!favorite);
        } else {
          setFavoriteToDatabase(currentUserId);
        }
      }).catch((error) => {
        console.error(error);
      });
    } else {
      contextType.handleOpenAuthModal();
    }
  }

  useEffect(() => {
    // eslint-disable-next-line
    let mounted = true;
    if (contextType.isLoggedIn) {
      if (props.isOpen) {
        get(child(dbRef, `users/${contextType.userId}/favorites/${props.movie.id}`)).then((snapshot) => {
          if (snapshot.exists()) {
            setFavorite(true);
          }
        }).catch((error) => {
          console.error(error);
        });
      }
      setCurrentUserId(contextType.userId);
    } else {
      setCurrentUserId('');
    }
    return () => { mounted = false; }
  }, [props.isOpen, contextType.isLoggedIn, contextType.userId, dbRef, props.movie.id]);

  const movie = props.movie;
  const APIIMAGEURL = 'https://image.tmdb.org/t/p/original';
  const circleIcon = <CircleIcon sx={ circleStyles } />;

  return (
    <Modal
    hideBackdrop
    open={ props.isOpen }
    onClose={ props.onCloseModal }
    aria-labelledby="Skyfall"
    aria-describedby="Lorem ipsum dolor sit amet"
    >
        <Slide direction="up" in={ props.isOpen } mountOnEnter unmountOnExit>
          <Box sx={style}>
              <Container>
                <Typography variant="h3" component="div" sx={{ textAlign: 'right' }}>
                  <Button variant="link" onClick={ props.onCloseModal }><CloseIcon sx={{ fontSize: 50 }} /></Button>
                </Typography>
                {movie &&
                  <Grid container spacing={ 5 }>
                      <Grid item xs={ 12 } md={ 6 }>
                          <Typography variant="h2" component="div" sx={{ textTransform: 'lowercase', fontWeight: '500' }}>
                            { movie.title }
                          </Typography>
                          <Typography variant="p" component="div" sx={{ textTransform: 'lowercase', fontWeight: '500' }}>
                            {(movie.genres && movie.genres.length > 0) && 
                              movie.genres[0].name
                            }
                            {(movie.genres && movie.genres.length > 0) && 
                              circleIcon
                            }
                            {movie['release_date'] &&
                              movie['release_date'].substring(0, 4)
                            }
                            {movie['release_date'] &&
                              circleIcon
                            }
                            {movie.runtime &&
                              movie.runtime + ' mins.'
                            }
                          </Typography>
                          <Typography variant="p" component="div" sx={{ color: grey[600] }} mt={ 4 }>
                            { movie.overview }
                          </Typography>
                          <Typography variant="p" component="div" sx={{ color: grey[600] }} mt={ 4 }>
                            approval rating: { movie['vote_average'] }/10
                          </Typography>
                          <Typography variant="p" component="div" sx={{ color: grey[600] }}>
                            release date: { movie['release_date'] }
                          </Typography>
                          <Typography variant="p" component="div" sx={{ color: grey[600] }}>
                            original language: { movie['original_language'] }
                          </Typography>
                          <Typography variant="span" component="div" sx={{ cursor: 'pointer', display: 'inline-block' }} mt={ 4 } color={ favorite ? red[500]: theme.primary } onClick={toggleFavorite}>
                            {favorite &&
                              <FavoriteIcon  />
                            }
                            {!favorite && 
                              <FavoriteBorderIcon />
                            }
                          </Typography>
                      </Grid>
                      <Grid item xs={ 12 } md={ 6 } sx={{ textAlign: 'center' }}>
                          {movie['poster_path'] &&
                            <img src={ APIIMAGEURL + movie['poster_path']} alt={ movie.title } style={{ height: 400 }} />
                          }
                          {!movie['poster_path'] &&
                            <Card sx={{ width: 267, margin: '0 auto' }}>
                                <CardActionArea>
                                    <CardContent sx={{ height: 400, background: grey[900] }}>
                                        <Typography variant="body2" style={{ color: '#ffffff', fontWeight: '500'}}>
                                            { movie.title }
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                          }
                      </Grid>
                  </Grid>
                }
              </Container>
              <Auth isOpen={ contextType.menuIsOpen } onCloseModal={ contextType.handleOpenAuthModal } onLogin={ contextType.handleLogin } onSetUsername={ contextType.handleSetUsername } />
          </Box>
        </Slide>
    </Modal>
  );
}

export default MovieDetail;

MovieDetail.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onCloseModal: PropTypes.func.isRequired,
  movie: PropTypes.object.isRequired
};