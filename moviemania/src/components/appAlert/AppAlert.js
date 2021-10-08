import React from 'react';
import PropTypes from 'prop-types';
import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function AppAlert(props) {
  return (
    <Snackbar open={ props.open ? true: false } autoHideDuration={ 4000 } onClose={ props.onClose }>
        <Alert onClose={ props.onClose } severity={ props.alertType } sx={{ width: '100%' }}>
          { props.message }
        </Alert>
    </Snackbar>
  );
}

AppAlert.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
  alertType: PropTypes.string.isRequired
}