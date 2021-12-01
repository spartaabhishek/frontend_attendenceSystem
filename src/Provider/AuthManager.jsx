import React from "react";

export const AuthContext = React.createContext({
  login_id: "",
  isLoggedIn: false,
  updateAuthContext: () => {},
});

export const AuthProvider = ({ children }) => {
  const [loginState, setLoginState] = React.useState({
    isLoggedIn: false,
    login_id: "",
  });

  const updateAuthContext = (loginId) => {
    setLoginState({
      isLoggedIn: true,
      login_id: loginId,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        ...loginState,
        updateAuthContext,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
