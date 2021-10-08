import React from 'react';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { AuthContext } from './context';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import { Typography } from '@mui/material';
import Link from '@mui/material/Link';
import NavBar from './components/navbar/NavBar';
import Search from './components/search/Search';
import Container from '@mui/material/Container';
import MoviesView from './views/MoviesView';
import SearchResultsView from './views/SearchResultsView';
import FavoritesView from './views/FavoritesView';
import AccountView from './views/AccountView';
import AppMenu from './components/appMenu/AppMenu';
import Auth from './components/auth/Auth';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      currentView: 'MoviesView',
      menuIsOpen: false,
      openAuthModal: false,
      isLoggedIn: false,
      username: '',
      searchResults: null,
      searchName: '',
      userId: ''
    };
  }

  handleUpdateView = (view) => {
    this.setState({
      currentView: view
    });
  }

  handleMenuOpen = ()  => {
    this.setState({
      menuIsOpen: !this.state.menuIsOpen
    });
  }

  handleOpenAuthModal = () => {
    this.setState({
      openAuthModal: !this.state.openAuthModal
    })
  }

  handleLogin = () => {
    this.setState({
      isLoggedIn: true
    });
  }

  handleLogout = () => {
    this.setState({
      isLoggedIn: false
    })
  }

  handleSetUsername = (name) => {
    this.setState({
      username: name
    })
  }

  handleSearchResults = (data, searchName) => {
    this.setState({
      searchResults: data,
      searchName: searchName
    })
  }

  componentDidMount() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.handleLogin();
        this.setState({
          username: user.displayName,
          userId: user.uid
        })
      } else {
        this.handleLogout();
      }
    });
  }

  render() {
    return (
      <AuthContext.Provider value={{ isLoggedIn: this.state.isLoggedIn, userId: this.state.userId, handleLogin: this.handleLogin, handleSetUsername: this.handleSetUsername, handleOpenAuthModal: this.handleOpenAuthModal, menuIsOpen: this.state.menuIsOpen }}>
        <ThemeProvider theme={ theme }>
          <NavBar onUpdateView={ this.handleUpdateView } onMenuOpen={ this.handleMenuOpen } onAuthModalOpen={ this.handleOpenAuthModal } username={ this.state.username } />
          {this.state.currentView !== 'FavoritesView' && this.state.currentView !== 'AccountView' &&
            <Search onUpdateView={ this.handleUpdateView } onSearchResults={ this.handleSearchResults } />
          }
          <Container>
            {this.state.currentView === 'MoviesView' &&
              <MoviesView />
            }
            {this.state.currentView === 'SearchResultsView' &&
              <SearchResultsView searchName={ this.state.searchName } searchResults={ this.state.searchResults } />
            }
            {this.state.currentView === 'FavoritesView' &&
              <FavoritesView onUpdateView={ this.handleUpdateView } />
            }
            {this.state.currentView === 'AccountView' &&
              <AccountView onOpenAuthModal={ this.handleOpenAuthModal } onUpdateView={ this.handleUpdateView } />
            }
          </Container>
          <AppMenu menuIsOpen={ this.state.menuIsOpen } onUpdateView={ this.handleUpdateView } onMenuOpen={ this.handleMenuOpen } onLogout={ this.handleLogout } />
          <Auth isOpen={ this.state.openAuthModal } onCloseModal={ this.handleOpenAuthModal } onLogin={ this.handleLogin } onSetUsername={ this.handleSetUsername } />
          <Typography variant="p" component="div" sx={{ textAlign: 'center', mb: 6 }} color="primary">
            Made with &hearts; by <Link href="https://www.ronnie-phillips.com" target="_blank" rel="noreferrer" underline="hover" color="inherit" style={{ fontWeight: 500 }}>Ronnie P</Link>
          </Typography>
          <Typography variant="p" component="div" sx={{ textAlign: 'center', mb: 6, fontSize: 10 }} color="primary">
          This product uses the TMDB API but is not endorsed or certified by TMDB.
          <br />
          <a href="https://www.themoviedb.org/" target="_blank" rel="noreferrer">
            <img src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg" alt="tmdb" style={{ width: 80, marginTop: 10 }} />
          </a>
          </Typography>
        </ThemeProvider>
      </AuthContext.Provider>
    );
  }
}

export default App;
