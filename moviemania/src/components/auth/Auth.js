import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, sendPasswordResetEmail } from "firebase/auth";
import Modal from '@mui/material/Modal';
import { Box } from '@mui/system';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { inputStyles } from '../../styles';
import AppAlert from '../appAlert/AppAlert';
import CircularProgress from '@mui/material/CircularProgress';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  p: 5,
  outline: 0,
  textAlign: 'center',
  textTransform: 'lowercase'
};

function Auth(props) {
    const [authType, setAuthType] = useState(0);
    const handleAuthType = (event, newAuthType) => {
        setAuthType(newAuthType);
    };
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const clearForm = () => {
        setUsername('');
        setEmail('');
        setPassword('');
    }

    const [alertOpen, setAlertOpen] = useState(false);
    const [alertType, setAlertType] = useState('');
    const [alertMsg, setAlertMsg] = useState('');
    const [loading, setLoading] = useState(false);
    const setAlert = (alertType, alertMsg) => {
        setAlertOpen(true);
        setAlertType(alertType);
        setAlertMsg(alertMsg);
    }
    const handleCloseAlert = () => {
        setAlertOpen(false);
    }

    const auth = getAuth();
    const setUpLogin = () => {
        setLoading(false);
        props.onLogin();
        props.onCloseModal();
        clearForm();
    }
    const loginHandler = () => {
        if (email && password) {
            setLoading(true);
            switch(authType) {
                case 0:
                    signInWithEmailAndPassword(auth, email, password)
                    .then((userCredential) => {
                        setUpLogin();
                    })
                    .catch((error) => {
                        setLoading(false);
                        setAlert('error', error.message);
                        console.log(error.message + ': Auth.js');
                    });
                  break;
                case 1:
                    if (username) {
                        createUserWithEmailAndPassword(auth, email, password)
                        .then((userCredential) => {
                            const user = userCredential.user;
                            updateProfile(auth.currentUser, {
                                displayName: username
                            }).then(() => {
                                props.onSetUsername(user.displayName);
                                setUpLogin();
                            }).catch((error) => {
                                setLoading(false);
                                setAlert('error', error.message);
                                console.log(error.message + ': Auth.js');
                            });
                        })
                        .catch((error) => {
                            setLoading(false);
                            setAlert('error', error.message);
                            console.log(error.message + ': Auth.js');
                        });
                    } else { setAlert('error', 'Username must not be empty.'); return; }
                  break;
                  default:
                      return;
              }
        } else { setAlert('error', 'Email and/or password must not be empty.'); return; }    
    };

    const passwordRestHandler = (e) => {
        if (email) {
            const auth = getAuth();
            sendPasswordResetEmail(auth, email)
            .then(() => {
                handleAuthType(e, 3);
            })
            .catch((error) => {
                setAlert('error', error.message);
                console.log(error.message + ': Auth.js');
            });
        } else{ setAlert('error', 'Email must not be empty.'); return; }
    };
    
  return (
    <Modal
    open={ props.isOpen ? true: false }
    onClose={ props.onCloseModal }
    aria-labelledby="Login/Signup"
    aria-describedby="Login/Signup"
    >
        <Box sx={style}>
            <Typography variant="h6" component="div">
                movie mania.
            </Typography> 
                {authType < 2 &&
                    <Tabs value={ authType } onChange={ handleAuthType } aria-label="auth type" centered>
                        <Tab label="login" />
                        <Tab label="signup" />
                    </Tabs>
                }
                {authType === 2 &&
                    <Typography variant="h6" component="div">
                        password reset
                    </Typography>
                }
                {authType === 3 &&
                    <Typography variant="h6" component="div">
                        password reset link sent!
                    </Typography>
                }
                {authType === 1 &&
                    <input type="text" placeholder="username" style={ inputStyles } value={ username } onChange={e => setUsername(e.target.value)} />
                }
                {authType < 3 &&
                    <input type="email" placeholder="email" style={ inputStyles } value={ email } onChange={e => setEmail(e.target.value)} />
                }
                {authType < 2 &&
                    <>
                        <input type="password" placeholder="password" style={ inputStyles } value={ password } onChange={e => setPassword(e.target.value)} />
                        <div style={{ marginTop: 30 }}>
                            <Button variant="cta" size="medium" onClick={ loginHandler }>
                                {authType === 0 &&
                                    <span>login</span>
                                }
                                {authType === 1 &&
                                    <span>signup</span>
                                }
                            </Button>
                            {authType === 0 &&
                                <Button variant="link" sx={{ display: 'block', margin: '0 auto', py: 0, mt: 4, textDecoration: 'underline' }} onClick={ (e) => handleAuthType(e, 2) }>forgot password</Button>
                            }
                        </div>
                    </>
                }
                {authType === 2 &&
                    <div style={{ marginTop: 30 }}>
                        <Button variant="cta" size="medium" onClick={ (e) => passwordRestHandler(e)}>
                            send reset link
                        </Button>
                    </div>
                }
                {authType >= 2 &&
                    <Button variant="link" sx={{ display: 'block', margin: '0 auto', py: 0, mt: 4, textDecoration: 'underline' }} onClick={ (e) => handleAuthType(e, 0) }>
                        login
                    </Button>
                }  
            <AppAlert open={ alertOpen } alertType={ alertType } message={ alertMsg } onClose={ handleCloseAlert } />
            {loading &&
                <CircularProgress sx={{ mt: 3 }} color="primary" />
            }
        </Box>
    </Modal>
  );
}

export default Auth;