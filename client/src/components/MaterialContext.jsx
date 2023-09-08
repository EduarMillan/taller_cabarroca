import React, {
  createContext, useContext, useState, useMemo,
} from 'react';
import PropTypes from 'prop-types';

const MaterialContext = createContext();

export function useMaterialContext() {
  return useContext(MaterialContext);
}

export function MaterialProvider({ children }) {
  const [shouldReload, setShouldReload] = useState(false);

  const contextValue = useMemo(() => ({ shouldReload, setShouldReload }), [
    shouldReload,
    setShouldReload,
  ]);

  return (
    <MaterialContext.Provider value={contextValue}>
      {children}
    </MaterialContext.Provider>
  );
}

MaterialProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
