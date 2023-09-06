import React, { createContext, useContext, useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from 'prop-types';

const MaterialContext = createContext();

export function useMaterialContext() {
  return useContext(MaterialContext);
}

export function MaterialProvider({ children }) {
  const [shouldReload, setShouldReload] = useState(false);

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <MaterialContext.Provider value={{ shouldReload, setShouldReload }}>
      {children}
    </MaterialContext.Provider>
  );
}

MaterialProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
