import React from "react";

import { AuthProvider } from "./src/Provider/AuthManager";

export const wrapRootElement = ({ element }) => {
  return (
    <AuthProvider>
      {element}
    </AuthProvider>
  );
};
