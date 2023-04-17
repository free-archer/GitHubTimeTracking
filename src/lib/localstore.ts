import { IDBIssue, ILabel } from '../types/dbissues'
import { IIssueAll } from '../types/issues'
import { ISettings } from '../types/settings'

//Timer
const GITHUBKEY = 'GITHUBKEY'

export const saveGitHubKey = (key:string) => {
    localStorage.setItem(GITHUBKEY, key)
}

export const getGitHubKey = ():string => {
    return localStorage.getItem(GITHUBKEY) || ''
}

export const clearGitHubKey = () => {
    localStorage.setItem(GITHUBKEY, '')
}

//RepositoryName
const REPOKEY = 'REPONAME'

export const saveRepositoryName = (name:string):void => {
    localStorage.setItem(REPOKEY, name)
}

export const getRepositoryName = ():string => {
    return localStorage.getItem(REPOKEY) || ''
}

//User name
const USERKEY = 'USERNAME'

export const saveUserName = (name:string):void => {
    localStorage.setItem(USERKEY, name)
}

export const getUserName= ():string => {
    return localStorage.getItem(USERKEY) || ''
}

//Pomodoro work tome
const POMODOROWORK = 'POMODOROWORK'

export const savePomodoroWorkTime = (pomodoroMaxValue:number):void => {
    localStorage.setItem(POMODOROWORK, pomodoroMaxValue.toString())
}

export const getPomodoroWorkTime = ():number => {
    const stime = localStorage.getItem(POMODOROWORK) || ''

    return parseInt(stime)
}

export const saveSettings= (settings:ISettings):void => {
    saveUserName(settings.username)
    saveRepositoryName(settings.reponame)
    saveGitHubKey(settings.key)
    savePomodoroWorkTime(settings.pomodoroMaxValue)
}

export const getSettings= ():ISettings => {
    const username = getUserName()
    const reponame = getRepositoryName()
    const key = getGitHubKey()
    const pomodoroMaxValue = getPomodoroWorkTime()

    return {
        key: key,
        username: username,
        reponame: reponame,
        pomodoroMaxValue: pomodoroMaxValue,
    }
}

//Issues

const ISSUESKEY = 'USSUES'

export const toDay = ():string => {
    const cur = new Date()

    return `${cur.getDate().toString().padStart(2, '0')}${cur.getMonth().toString().padStart(2, '0')}${cur.getFullYear().toString().padStart(2, '0')}`
}

//GET
export const getIssuesDB = ():IDBIssue[] => {
    let issues:IDBIssue[] = JSON.parse(localStorage.getItem(ISSUESKEY) || JSON.stringify([]))

    return issues
}

export const getIssueDBByID = (id: number):IDBIssue|undefined => {
    const issues:IDBIssue[] = getIssuesDB()

    const issue:IDBIssue|undefined = findIssueByID(id, issues)

    return issue 
}

const findIssueByID = (id:number, issues:IDBIssue[]):IDBIssue|undefined => {
    if (!issues || issues.length == 0) {
        return undefined
    }
    const issue:IDBIssue|undefined = issues.find((value) => (value.id === id))

    return issue
}

export const getIssueTimeDB = (id: number, date?: string):number => {
    const issue:IDBIssue|undefined = getIssueDBByID(id)

    if (date === undefined) date = toDay()
    
    if (issue === undefined) return 0

    const time:number = getTime(issue, date)

    return (time === undefined ? 0 : time)
}

export const getTime = (issue:IDBIssue, date:string):number => {
        const time:number = issue.curtime || 0
     
        return time
 }

//SET
export const setIssueTimeDB = (id: number, started:boolean, time:number, date?:string):void => {
    const issue = getIssueDBByID(id)

    if (!issue) return undefined

    if (date === undefined) date = toDay()

    issue.curtime = time

    setIssueDB(issue)
}

export const setIssueDB = (issue: IDBIssue):void => {
    const issues:IDBIssue[] = getIssuesDB()

    if (issue.id !== 0) {
        const newissues = issues.map((elem:IDBIssue) => {
            if (elem.id === issue.id) {
                return issue
            }

            return elem
        })

        setIssuesDB(newissues)
    }
}

export const setIssuesDB = (issues:IDBIssue[]):void => {
    localStorage.setItem(ISSUESKEY, JSON.stringify(issues))
}

export const setIssuesGitHub = (issues_github:IIssueAll[]):IDBIssue[] => {
    const issuesDB:IDBIssue[] = getIssuesDB()
    let newIssuesDB:IDBIssue[] = []

    for (const issue_github of issues_github) {

        const labels:ILabel[] = issue_github.labels.map(elem => ({
            id: elem.id,
            name: elem.name,
            color: elem.color
        }))

        const matches = issue_github.title.match(/(^[A-Z]+)-[0-9]+\s/)
        if (matches) {
            const project_name = matches[1]

            const Project:ILabel = {
                id: project_name,
                name: project_name,
                color: '7a189e'
            }  
            
            labels.unshift(Project)
        }

        const newIssueDB:IDBIssue = {
            id : issue_github.id,
            title: issue_github.title,
            url: issue_github.html_url,
            started: false,
            curtime: 0,
            labels: labels
        }

        const issueDB:IDBIssue|undefined = findIssueByID(issue_github.id, issuesDB)

        if (issueDB !== undefined && issueDB.id !== 0) {

            newIssueDB.curtime = issueDB.curtime
        }

        newIssuesDB.push(newIssueDB)
    }

    setIssuesDB(newIssuesDB)

    return newIssuesDB
}
