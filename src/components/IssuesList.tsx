import React from "react";
import IssueItem from "./IssueItem";
import {} from '../types/issues'

const IssuesList:React.FC  = () => {

  return (
    <div className="container">
      <h2>Issues List</h2>
      <IssueItem />
    </div>
  )
}

export default IssuesList;