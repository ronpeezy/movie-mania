import React from 'react';
import { AuthContext } from '../../context';
import PropTypes from 'prop-types';
import Container from '@mui/material/Container';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Button from '@mui/material/Button';

function ElevationScroll(props) {
    const { children, window } = props;
    const trigger = useScrollTrigger({
      disableHysteresis: true,
      threshold: 0,
      target: window ? window() : undefined,
    });
  
    return React.cloneElement(children, {
      elevation: trigger ? 4 : 0,
      variant: trigger ? 'bordered' : 'nonBordered'
    });
  }
  
  ElevationScroll.propTypes = {
    children: PropTypes.element.isRequired,
    window: PropTypes.func,
  };

class NavBar extends React.Component {
    static contextType = AuthContext;

    render() {
        return (
            <React.Fragment>
                <CssBaseline />
                <ElevationScroll { ...this.props }>
                    <AppBar>
                        <Container>
                            <Toolbar>
                                <Typography variant="h5" component="div" sx={{ flexGrow: 1, cursor: 'pointer' }} color="primary" onClick={ () => this.props.onUpdateView('MoviesView') }>
                                    movie mania.
                                </Typography>
                                {!this.context.isLoggedIn &&
                                    <Button variant="link" onClick={ () => this.props.onAuthModalOpen() }>Login/Signup</Button>
                                }
                                {this.context.isLoggedIn &&
                                    <Button variant="link" onClick={ () => this.props.onMenuOpen() }>hi, { this.props.username }</Button>
                                }
                            </Toolbar>
                        </Container>
                    </AppBar>
                </ElevationScroll>
            </React.Fragment>
        );
    }
}

export default NavBar;

NavBar.propTypes = {
    onUpdateView: PropTypes.func,
    onMenuOpen: PropTypes.func, 
    onAuthModalOpen: PropTypes.func, 
    username: PropTypes.string
}
