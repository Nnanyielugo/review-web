import React from 'react';
import PropTypes from 'prop-types';

export default function Index({ Component }) {
  return (
    <main>
      <Component />
    </main>
  );
}

Index.propTypes = {
  Component: PropTypes.func.isRequired,
};
