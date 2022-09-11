import React from "react";
import { IIssue } from "../types/issues";

const IssueItem:React.FC<IIssue>  = (props) => {

  return (
    <>

      <li className="">{props.title}</li>

    </>
  )
}

export default IssueItem;