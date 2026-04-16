import React, { useEffect, useState, useContext } from "react";
import IssueItem from "./IssueItem";
import { IDBIssue, ILabel } from '../types/dbissues'
import { Octokit } from "@octokit/core";
import { IIssueAll } from "../types/issues";
// import { setIssuesGitHub } from '../lib/localstore'
import { SettingsContext } from "../lib/SettingsContext";
import Total from "./Total";
import PomodoroTimer from "./PomodoroTimer";
import { Filter } from "./Filter";

import { useIssuesStore } from "../stores/dbissues";

const GITHUB_ACCEPT_HEADER = 'application/vnd.github+json'
const GITHUB_API_VERSION = '2026-03-10'

const getGitHubErrorMessage = (error: unknown): string => {
  const status = typeof error === 'object' && error !== null && 'status' in error
    ? Number((error as { status?: number }).status)
    : undefined

  if (status === 401) {
    return 'Ошибка авторизации GitHub. Проверьте токен.'
  }

  if (status === 403) {
    return 'Доступ запрещен или превышен лимит GitHub API.'
  }

  if (status === 404) {
    return 'Репозиторий не найден. Проверьте owner/repository.'
  }

  return 'Не удалось загрузить issues из GitHub.'
}

const IssuesList: React.FC = () => {
  const settingsContext = useContext(SettingsContext)
  // const [issues, setIssues] = useState<Array<IDBIssue>>([])
  const [filtredIssues, setFiltredIssues] = useState<Array<IDBIssue>>([])
  const [total, setTotal] = useState<number>(0)
  const [filterLabels, setFilterLabels] = useState<ILabel[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [requestError, setRequestError] = useState<string>('')

  settingsContext.setFilterLabels = setFilterLabels

  const issuesState:any = useIssuesStore()
  const setIssuesGitHub = useIssuesStore((state:IDBIssue[]|any) => state.setDBIssues)

  useEffect(() => {
    getIssues()
  }, []
  )

  useEffect(() => {

      if (filterLabels.length) {

        const labels = filterLabels.map(el => el.id)
        const issues:IDBIssue[] = issuesState.issuesDB
        setFiltredIssues(state => (issues.filter((dbissue) => labels.every(id => dbissue.labels.some(dbl => dbl.id === id)))))

      } else {

        setFiltredIssues(state => issuesState.issuesDB)

      }
    }, [filterLabels, issuesState.issuesDB]
  )

  const getIssues = async () => {
    const gitHubKey: string = settingsContext.settings.key
    const repositoryName: string = settingsContext.settings.reponame
    const userName: string = settingsContext.settings.username

    if (gitHubKey === '' || repositoryName === '' || userName === '') {
      setRequestError('Заполните токен GitHub, user и repository в настройках.')
      return
    }

    const octokit = new Octokit({
      auth: gitHubKey,
    });

    setIsLoading(true)
    setRequestError('')

    try {
      const perPage = 100
      let page = 1
      let hasMore = true
      const issuesGitHub: unknown[] = []

      while (hasMore) {
        const issuesData = await octokit.request('GET /repos/{owner}/{repo}/issues', {
          owner: userName,
          repo: repositoryName,
          sort: 'updated',
          per_page: perPage,
          page,
          headers: {
            accept: GITHUB_ACCEPT_HEADER,
            'X-GitHub-Api-Version': GITHUB_API_VERSION
          }
          // labels: filterLabels.map((el) => (el.name)).join(',')
        })

        if (issuesData.status !== 200) {
          break
        }

        const currentPageIssues = issuesData.data.filter((issue) => issue.pull_request === undefined)
        issuesGitHub.push(...currentPageIssues)
        hasMore = issuesData.data.length === perPage
        page += 1
      }

      setIssuesGitHub(issuesGitHub as IIssueAll[])

      const dbIssues: IDBIssue[] = (useIssuesStore.getState() as { issuesDB: IDBIssue[] }).issuesDB
      setFiltredIssues(dbIssues)
      setFilterLabels([])
      setTotal(dbIssues.reduce((sum, issue) => sum + issue.curtime, 0))
    } catch (error: unknown) {
      setRequestError(getGitHubErrorMessage(error))
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex w-full items-start justify-center">

      <div className="flex flex-col  w-[80%] items-center justify-center">

        <div className="container border">
          <div className="flex flex-row-reverse bg-[#c3dbf5] border-b h-10 items-center">

            <button
              onClick={getIssues}
              disabled={isLoading}
              className="flex flex-row items-center mx-2 w-32 h-8 bg-[#B2384F] border-blue-800 text-[#e6e3d4] border px-2 rounded-md disabled:cursor-not-allowed disabled:opacity-70">

              <svg className="w-4 h-4 mx-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" >
                <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
              </svg>

              {isLoading ? 'Loading...' : 'Refresh'}

            </button>

            <div className="flex">
              {filterLabels.map((label) => 
              (
                label &&
                <Filter 
                key={label.id}
                label={label}
                setFilterLabels={setFilterLabels}
                />
              )
              )}
            </div>            

          </div>

          {requestError !== '' &&
            <div className="m-2 rounded border border-red-300 bg-red-50 px-3 py-2 text-sm text-red-700">
              {requestError}
            </div>
          }

          {filtredIssues?.map((issue: IDBIssue) => (
            <IssueItem
              key={issue.id}
              id={issue.id}
              title={issue.title}
              url={issue.url}
              started={issue.started}
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