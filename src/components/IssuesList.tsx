import React, { useEffect, useState } from "react";
import IssueItem from "./IssueItem";
import { IDBIssue } from '../types/dbissues'
import { Octokit } from "@octokit/core";
import { getGitHubKey, setIssuesGitHub, getRepositoryName, getUserName } from '../lib/localstore'
import Total from "./Total";


const IssuesList:React.FC  = () => {
  const [issues, setIssues] = useState<Array<IDBIssue>>([])
  const [total, setTotal] = useState<number>(0)

  useEffect(() => {
      getIssues()
    }, []
  )

  const getIssues = async () => {
    const gitHubKey:string = getGitHubKey()
    const repositoryName:string = getRepositoryName()
    const userName:string = getUserName()

    const octokit = new Octokit({
        auth: gitHubKey,
      });

    const issuesData = await octokit.request(`GET /repos/${userName}/${repositoryName}/issues`, {
      sort: 'updated'
      }
    )

    if (issuesData.status === 200) {

      const dbIssues:IDBIssue[] = setIssuesGitHub(issuesData.data)
      setIssues(state => dbIssues)

      let sum = 0
      dbIssues.forEach(issue => sum+=issue.curtime)

      setTotal(sum)
    }
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