import React from "react";
import IssueItem from "./IssueItem";
import {} from '../types/issues'
import { Octokit, App } from "octokit";

const IssuesList:React.FC  = () => {

    // const [issues, setIssues] = useState<Array<IIssue>>([])
  
    const getIssues = async () => {
  
        const octokit = new Octokit({
            auth: "dffd",
          });
  
        const issuesData = await octokit.request('GET /repos/free-archer/Sibedge/issues', {})
        // setIssues(state => issuesData.data)
    }  

  return (
    <div className="container">
      <h2>Issues List</h2>
      <IssueItem />
    </div>
  )
}

export default IssuesList;