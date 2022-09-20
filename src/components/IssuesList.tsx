import React, { useEffect, useState } from "react";
import IssueItem from "./IssueItem";
import { IDBIssue } from '../types/dbissues'
import { Octokit } from "@octokit/core";
import { getGitHubKey, setIssuesGitHub, getRepositoryName, getUserName } from '../lib/localstore'
import Total from "./Total";


const IssuesList:React.FC  = () => {
  const [issues, setIssues] = useState<Array<IDBIssue>>([])
  const [gitHubKey, setGitHubKey] = useState<string>('')
  const [repositoryName, setRepositoryName] = useState<string>('')
  const [userName, setUserName] = useState<string>('')
  const [total, setTotal] = useState<number>(0)

  useEffect(() => {
    const key:string = getGitHubKey()
    setGitHubKey(key)

    const repo_name:string = getRepositoryName()
    setRepositoryName(repo_name)

    const user_name:string = getUserName()
    setUserName(user_name)    

  }, []
  )

  const getIssues = async () => {

      const octokit = new Octokit({
          auth: gitHubKey,
        });

      const issuesData = await octokit.request(`GET /repos/${userName}/${repositoryName}/issues`, {
        sort: 'updated'
        }
      )

      const dbIssues:IDBIssue[] = setIssuesGitHub(issuesData.data)
      setIssues(state => dbIssues)

      let sum = 0
      dbIssues.forEach(issue => sum+=issue.curtime)

      setTotal(sum)
  }

  return (
    <>
    <div className="columns">
      <div className="column is-four-fifths">
              
      </div>

      <div className="column">

        <button 
          onClick={getIssues}
          className="button is-info _btntimer">Refresh</button>
        </div>

    </div>

      {issues?.map((issue:IDBIssue) => (
        <IssueItem 
        key={issue.id}
        id={issue.id}
        title={issue.title}
        url={issue.url}
        times={issue.times}
        started={issue.started}
        total={issue.total}
        curtime={issue.curtime}
        label={issue.label}
        />
      ))}

      <Total total={total}/>
</>           
  )
}

export default IssuesList;