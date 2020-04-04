import React, { useContext } from "react";

import { ServicesContext } from "../../services/services";

const App: React.FC = () => {
  const gameReduser = useContext(ServicesContext);

  console.log(gameReduser);

  return <div> Hello there!!! </div>;
};

export default App;
