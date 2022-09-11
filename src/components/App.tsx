import React from "react";
import IssuesList from "./IssuesList";

const App:React.FC  = () => {

  return (
    <div className="container">
      <h1>GitHub Time Tracking</h1>
      <IssuesList />
    </div>
  )
}

export default App;
