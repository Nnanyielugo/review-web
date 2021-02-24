import React from 'react';
import PropTypes from 'prop-types';
import { createMuiTheme, ThemeProvider as AppThemeProvider } from '@material-ui/core/styles';

const theme = createMuiTheme({});

export default function ThemeProvider({ children }) {
  return (
    <AppThemeProvider theme={theme}>
      {children}
    </AppThemeProvider>
  );
}

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
