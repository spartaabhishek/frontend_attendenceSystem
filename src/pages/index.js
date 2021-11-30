import * as React from "react";
import Dashboard from "./Dashboard";
// markup
const IndexPage = () => {
  React.useEffect(() => {
    window.location.href = window.location.host + "/Room";
  }, []);
  return (
    <div>
      <Dashboard />
    </div>
  );
};

export default IndexPage;
