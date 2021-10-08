import React from 'react';
import { getAuth, updatePassword, reauthenticateWithCredential, deleteUser } from "firebase/auth";
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { inputStyles } from '../styles';
import AppAlert from '../components/appAlert/AppAlert';
import CircularProgress from '@mui/material/CircularProgress';

class AccountView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            displayName: '',
            email: '',
            password: '',
            alertOpen: false,
            alertType: '',
            alertMsg: '',
            loading: false
        }
    }

    componentDidMount() {
        const auth = getAuth();
        const user = auth.currentUser;
        if (user !== null) {
            this.setState({
                displayName: user.displayName,
                email: user.email
            });
        }
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

    setUserPassword = () => {
        if (this.state.password) {
            this.setState({ loading: true });
            const auth = getAuth();
            const user = auth.currentUser;
            updatePassword(user, this.state.password).then(() => {
                this.setState({ loading: false });
                this.setAlert('success', 'Password has been updated!');
                this.setState({
                    password: ''
                });
            }).catch((error) => {
                this.setState({ loading: false });
                this.setAlert('error', error.message);
                console.log(error.message);
                if (error.code === 'auth/requires-recent-login') {
                    const credential = this.props.onOpenAuthModal();
                    reauthenticateWithCredential(user, credential).then(() => {
                        this.setAlert('success', 'User re-authenticated.');
                        console.log('User re-authenticated.');
                    }).catch((error) => {
                        this.setAlert('error', error.message);
                        console.log(error.message);
                    });
                }
            });
        } else { this.setAlert('error', 'Password must not be empty.'); return; }
    }

    handleChange(e) {
        this.setState({ password: e.target.value });
    }

    deleteAccount = () => {
        this.setState({ loading: true });
        const auth = getAuth();
        const user = auth.currentUser;
        deleteUser(user).then(() => {
            this.setState({ loading: false });
            this.props.onUpdateView('MoviesView');
        }).catch((error) => {
            this.setState({ loading: false });
            this.setAlert('error', error.message);
            console.log(error.message);
            if (error.code === 'auth/requires-recent-login') {
                const credential = this.props.onOpenAuthModal();
                reauthenticateWithCredential(user, credential).then(() => {
                    this.setAlert('success', 'User re-authenticated.');
                    console.log('User re-authenticated.');
                }).catch((error) => {
                    this.setAlert('error', error.message);
                    console.log(error.message);
                });
            }
        });
    }

    render() {
        return (
            <Box sx={{ mt: 15, mb: 10 }}>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1, mb: 2 }} color="primary">
                    My Account
                </Typography>
                <Typography variant="p" component="div" mt={ 4 } style={{ textTransform: 'capitalize' }}>
                    { this.state.displayName}
                </Typography>
                <Typography variant="p" component="div" mt={ 1 }>
                    { this.state.email }
                </Typography>
                <Grid container>
                    <Grid item xs={ 12 } md={ 4 }>
                        <input type="password" placeholder="change password" style={ inputStyles } value={ this.state.password } onChange={ this.handleChange.bind(this) } />
                        <div style={{ marginTop: 30 }}><Button variant="cta" size="medium" onClick={ this.setUserPassword }>update password</Button></div>
                        <div style={{ marginTop: 30 }}><Button variant="link" size="medium" onClick={ this.deleteAccount }>delete account</Button></div>
                        <AppAlert open={ this.state.alertOpen } alertType={ this.state.alertType } message={ this.state.alertMsg } onClose={ this.handleCloseAlert } />
                        {this.state.loading &&
                            <CircularProgress sx={{ mt: 3 }} color="primary" />
                        }
                    </Grid>
                </Grid>
            </Box>
        );
    }
}

export default AccountView;

AccountView.propTypes = {
    onOpenAuthModal: PropTypes.func.isRequired,
    onUpdateView: PropTypes.func.isRequired
}
