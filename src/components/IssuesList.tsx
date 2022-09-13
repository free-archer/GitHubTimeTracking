import React, { useEffect, useMemo, useState } from "react";
import IssueItem from "./IssueItem";
import { IIssue } from '../types/issues'
import { IDBIssue } from '../types/dbissues'
import { Octokit } from "@octokit/core";
import { getGitHubKey, setIssuesGitHub } from '../lib/localstore'
import KeySet from "./KeySet";
import { time } from "console";


const IssuesList:React.FC  = () => {
  const [issues, setIssues] = useState<Array<IDBIssue>>([])
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
      const dbIssues:IDBIssue[] = setIssuesGitHub(issuesData.data)
      setIssues(state => dbIssues)
      
  }

  return (
    <>
    <div className="columns">
      <div className="column is-four-fifths">
        
 
              
      </div>

      <div className="column">

        <button 
          onClick={getIssues}
          className="button is-info">Get...</button>
        </div>

      <div className="column">

        <KeySet gitHubKey={gitHubKey}/>

      </div>
    </div>

      {issues?.map((issue:IDBIssue) => (
        <IssueItem 
        key={issue.id}
        id={issue.id}
        title={issue.title}
        url={issue.url}
        time={issue.time}
        started={issue.started}
        />
      ))}
</>           
  )
}

export default IssuesList;