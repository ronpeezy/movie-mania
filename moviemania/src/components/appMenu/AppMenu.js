import React from 'react';
import PropTypes from 'prop-types';
import { getAuth, signOut } from "firebase/auth";
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import { Typography } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

export default function AppMenu(props) {
  const views = [
    {view: 'MoviesView'},
    {view: 'AccountView'},
    {view: 'FavoritesView'},
    {view: 'MoviesView'}
  ];

  const logout = (index) => {
    const auth = getAuth();
    signOut(auth).then(() => {
        props.onLogout();
        props.onUpdateView(views[index].view);
    }).catch((error) => {
        console.log(error.message);
    });
  }

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={ props.onMenuOpen }
      onKeyDown={ props.onMenuOpen }
    >
      <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: 'center', mt: 4, mb: 3, fontWeight: 400 }} color="primary">
        movie mania.
      </Typography>
      <List>
        {['Home', 'My Account', 'My Favorites', 'Logout'].map((text, index) => (
          <ListItem button key={text}>
            {index < 3 ? <ListItemText primary={text} onClick={ () => props.onUpdateView(views[index].view) } />: <ListItemText primary={text} onClick={ () => logout(index) } />}
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
        <React.Fragment>
          <Drawer
            anchor={'right'}
            open={ props.menuIsOpen }
            onClose={ props.onMenuOpen }
          >
            {list('right')}
          </Drawer>
        </React.Fragment>
    </div>
  );
}

AppMenu.propTypes = {
  menuIsOpen: PropTypes.bool.isRequired, 
  onUpdateView: PropTypes.func.isRequired, 
  onMenuOpen: PropTypes.func.isRequired, 
  onLogout: PropTypes.func.isRequired
}