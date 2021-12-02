import * as React from "react";

import Dashboard from "../Components/Dashboard";
import Form from "../Components/RegisterForm";
import { navigate } from "gatsby";
import { AuthContext } from "../Provider/AuthManager";

const Register = () => {
  const authContext = React.useContext(AuthContext)

  React.useEffect(() => {
    if (!authContext.isLoggedIn) {
      navigate("/")
    }
  }, [])

  return (
    <Dashboard>
      <Form />
    </Dashboard>
  );
};

export default Register;
