import React from 'react';
import PropTypes from 'prop-types';

import AuthProvider from './Auth';
import ModalProvider from './Modal';
import ReviewProvider from './Review';

export default function AppProvider({ children }) {
  return (
    <AuthProvider>
      <ModalProvider>
        <ReviewProvider>
          {children}
        </ReviewProvider>
      </ModalProvider>
    </AuthProvider>
  );
}

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
