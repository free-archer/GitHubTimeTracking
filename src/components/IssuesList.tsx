import React, { useEffect, useState, useContext } from "react";
import IssueItem from "./IssueItem";
import { IDBIssue } from '../types/dbissues'
import { Octokit } from "@octokit/core";
import { setIssuesGitHub } from '../lib/localstore'
import { SettingsContext } from "../lib/SettingsContext";
import Total from "./Total";
import PomodoroTimer from "./PomodoroTimer";
import { Filter } from "./Filter";

const IssuesList: React.FC = () => {
  const settingsContext = useContext(SettingsContext)
  const [issues, setIssues] = useState<Array<IDBIssue>>([])
  const [total, setTotal] = useState<number>(0)
  const [filterLabels, setFilterLabels] = useState<string>('')

  settingsContext.setFilterLabels = setFilterLabels

  useEffect(() => {
    getIssues()
  }, [filterLabels]
  )

  const getIssues = async () => {
    const gitHubKey: string = settingsContext.settings.key
    const repositoryName: string = settingsContext.settings.reponame
    const userName: string = settingsContext.settings.username    

    const octokit = new Octokit({
      auth: gitHubKey,
    });

    const issuesData = await octokit.request(`GET /repos/${userName}/${repositoryName}/issues`, {
      sort: 'updated',
      labels: filterLabels
    }
    )

    if (issuesData.status === 200) {

      const dbIssues: IDBIssue[] = setIssuesGitHub(issuesData.data)
      setIssues(state => dbIssues)

      let sum = 0
      dbIssues.forEach(issue => sum += issue.curtime)

      setTotal(sum)
    }
  }

  return (
    <div className="flex w-full items-start justify-center">

      <div className="flex flex-col  w-[80%] items-center justify-center">

        <div className="container border">
          <div className="flex flex-row-reverse bg-[#c3dbf5] border-b h-10 items-center">

            <button
              onClick={getIssues}
              className="flex flex-row items-center mx-2 w-32 h-8 bg-[#B2384F] border-blue-800 text-[#e6e3d4] border px-2 rounded-md ">

              <svg className="w-4 h-4 mx-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" >
                <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
              </svg>

              Refresh

            </button>

            <div className="flex">
              {filterLabels.split(',').map((label) => 
              (
                label &&
                <Filter 
                key={label}
                label={label}
                setFilterLabels={setFilterLabels}
                />
              )
              )}
            </div>            

          </div>

          {issues?.map((issue: IDBIssue) => (
            <IssueItem
              key={issue.id}
              id={issue.id}
              title={issue.title}
              url={issue.url}
              times={issue.times}
              started={issue.started}
              total={issue.total}
              curtime={issue.curtime}
              labels={issue.labels}
            />
          ))}

          <Total total={total} />
        </div>

      </div>

      <div className="flex w-[100px] mt-1">
            <PomodoroTimer />
      </div>

    </div>
  )
}

export default IssuesList;