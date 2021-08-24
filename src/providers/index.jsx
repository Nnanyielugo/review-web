import React from 'react';
import PropTypes from 'prop-types';

import AuthProvider from './Auth';
import ModalProvider from './Modal';
import ReviewProvider from './Review';
import UserProvider from './User';

export default function AppProvider({ children }) {
  return (
    <AuthProvider>
      <UserProvider>
        <ModalProvider>
          <ReviewProvider>{children}</ReviewProvider>
        </ModalProvider>
      </UserProvider>
    </AuthProvider>
  );
}

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
