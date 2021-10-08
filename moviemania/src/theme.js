import { createTheme } from '@mui/material/styles';
import { grey, red } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    primary: {
        main: grey[900],
    },
    secondary: {
        main: red[500],
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: '#ffffff',
          boxShadow: 'none',
        },
      },
      variants: [
        {
          props: { variant: 'bordered' },
          style: {
            borderBottom: `1px solid ${grey[300]}`
          },
        },
        {
          props: { variant: 'nonBordered' },
          style: {
            border: 'none',
          },
        },
      ],
    },
    MuiButton: {
        defaultProps: {
            disableRipple: true,
        },
        variants: [
            {
              props: { variant: 'cta', size: 'large' },
              style: {
                background: red[500],
                color: '#ffffff',
                textTransform: 'none',
                fontSize: 20,
                borderRadius: 0,
                padding: '6px 46px',
                '&:hover': {
                    background: red[700],
                },
              },
            },
            {
              props: { variant: 'cta', size: 'medium' },
              style: {
                background: red[500],
                color: '#ffffff',
                textTransform: 'none',
                fontSize: 14,
                borderRadius: 0,
                padding: '6px 20px',
                '&:hover': {
                    background: red[700],
                },
              },
            },
            {
              props: { variant: 'link' },
              style: {
                background: 'none',
                color: grey[900],
                textTransform: 'lowercase',
                '&:hover': {
                    background: 'none',
                    color: grey[700],
                },
              },
            },
        ],
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 0,
        },
      },
    },
    MuiListItem: {
      defaultProps: {
        disableRipple: true,
      },
    },
    MuiTab: {
      defaultProps: {
        disableRipple: true,
      },
      styleOverrides: {
        root: {
          textTransform: 'lowercase',
        },
      },
    }
  },
});

export default theme;