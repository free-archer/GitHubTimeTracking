import React, { useMemo, useState } from "react";
import IssueItem from "./IssueItem";
import { IIssue } from '../types/issues'
import { Octokit } from "@octokit/core";
import { getGitHubKey } from '../lib/localstore'
import KeySet from "./KeySet";


const IssuesList:React.FC  = () => {
  const [issues, setIssues] = useState<Array<IIssue>>([])
  const [gitHubKey, setGitHubKey] = useState<string>('')

  useMemo(() => {
    const key:string = getGitHubKey()
    setGitHubKey((state) => (state = key))
  },
   [gitHubKey]
   )

  const getIssues = async () => {

      const octokit = new Octokit({
          auth: gitHubKey,
        });

      const issuesData = await octokit.request('GET /repos/free-archer/Sibedge/issues', {})
      setIssues(state => issuesData.data)
  }

  return (
<div className="columns">
<div className="column is-four-fifths">
<ul>
      {issues?.map((issue: IIssue) => (
                <IssueItem 
                key={issue.id}
                title={issue.title}
                url={issue.url}
                />
            ))}        
</ul>        
      </div>

      <div className="column">

          <button 
          onClick={getIssues}
          className="button is-success">Get</button>
        </div>

    <div className="column">

        <KeySet gitHubKey={gitHubKey}/>

    </div>
    </div>
  )
}

export default IssuesList;