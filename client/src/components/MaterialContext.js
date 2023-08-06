import React, { createContext, useContext, useState } from "react";

const MaterialContext = createContext();

export function useMaterialContext() {
  return useContext(MaterialContext);
}

export function MaterialProvider({ children }) {
  const [shouldReload, setShouldReload] = useState(false);

  return (
    <MaterialContext.Provider value={{ shouldReload, setShouldReload }}>
      {children}
    </MaterialContext.Provider>
  );
}
