import React, { useContext } from "react";
import Dashboard from "../Components/Dashboard";
import Room from "../Components/CreateRoom";

import { AuthContext } from "../Provider/AuthManager";

function CreateRoom() {
  const authContext = useContext(AuthContext)
  return (
    <Dashboard>
      <Room loginId={authContext.login_id} />
    </Dashboard>
  );
}

export default CreateRoom;
