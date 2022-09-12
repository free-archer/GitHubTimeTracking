import { IDBIssue, IIssueTime } from '../types/dbissues'

const GITHUBKEY = 'GITHUBKEY'

export const saveGitHubKey = (key:string) => {
    localStorage.setItem("GITHUBKEY", key)
}

export const getGitHubKey = ():string => {
    return localStorage.getItem("GITHUBKEY") || ''
}

export const clearGitHubKey = () => {
    localStorage.setItem("GITHUBKEY", '')
}

export const getIssueTimeDB = (id: string):IIssueTime => {
    const empty_issue:IDBIssue = {
        id: '',
        title: '',
        time: {
            date: new Date(),
            time_hour: 0,
            time_string: '' 
        }
    }
    const issue:IDBIssue = JSON.parse(localStorage.getItem("ISSUE") || JSON.stringify(empty_issue))
    const issue_time:IIssueTime = issue.time
    return issue_time
}

export const setIssueDB = (issues: IDBIssue[]):void => {
    localStorage.setItem("ISSUES", JSON.stringify(issues))
}