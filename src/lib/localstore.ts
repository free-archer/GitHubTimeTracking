import { time } from 'console'
import { IDBIssue, ILabel, ITime } from '../types/dbissues'
import { IIssueAll } from '../types/issues'

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

export const getOTime = (issue:IDBIssue, date:string):ITime => {
    if (issue.times) {
        const oTime:ITime|undefined = issue.times.find((elem) => (elem.date === date))

        if (oTime) {
            return oTime       
        }
    }

    return {date: date, time: 0}
}

export const getTime = (issue:IDBIssue, date:string):number => {
        const times = getOTime(issue, date)

        const time:number = times?.time || 0
     
        return time
 }

//SET
export const setIssueTimeDB = (id: number, started:boolean, time:number, date?:string):void => {
    const issue = getIssueDBByID(id)

    if (!issue) return undefined

    if (date === undefined) date = toDay()

    let find = false
    issue.times = issue.times?.map((elem) => {
        if (elem.date == date) {
            elem.time = time
            find = true
        }

        return elem
    })

    if (!find) {
        issue.times?.push({date: date, time: time})
    }

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

        const label:ILabel|undefined = issue_github.labels.find(elem => (elem.color !== '#dddddd'))
        // const labels:ILabel[] = issue_github.labels.map(elem => ({
        //     id: elem.id,
        //     name: elem.name,
        //     color: elem.color
        // }))

        const newIssueDB:IDBIssue = {
            id : issue_github.id,
            title: issue_github.title,
            url: issue_github.html_url,
            started: false,
            total: 0,
            curtime: 0,
            times: [],
            label: label
        }

        const issueDB:IDBIssue|undefined = findIssueByID(issue_github.id, issuesDB)

        if (issueDB !== undefined && issueDB.id !== 0 && issueDB.times) {
            issueDB.times?.forEach((elem) => {
                    newIssueDB.times?.push(elem)
                    newIssueDB.total += elem.time
                    if (elem.date === toDay()) {
                        newIssueDB.curtime = elem.time
                    }
            })
        }

        newIssuesDB.push(newIssueDB)
    }

    setIssuesDB(newIssuesDB)

    return newIssuesDB
}
