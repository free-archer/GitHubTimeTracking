import React from "react";
import { IIssue } from "../types/issues";

const IssueItem:React.FC<IIssue>  = (props) => {

  return (
    
    <div className="columns">

      <div className="column column is-four-fifths py-1 height-min title-text ">
        {props.title}
      </div>

      <div className="column py-1">
        <button className="button is-success is-focused small height-min">Start</button>
      </div>

    </div>
    
  )
}

export default IssueItem;