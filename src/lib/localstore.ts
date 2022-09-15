import { IDBIssue } from '../types/dbissues'
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

//Issues

const ISSUESKEY = 'USSUES'

export const toDay = ():string => {
    const cur = new Date()

    return `${cur.getDate().toString().padStart(2, '0')}${cur.getMonth().toString().padStart(2, '0')}${cur.getFullYear().toString().padStart(2, '0')}`
}

//GET
export const getIssuesDB = ():IDBIssue[] => {
    let issues:IDBIssue[] = JSON.parse(localStorage.getItem(ISSUESKEY) || JSON.stringify([]))

    issues = issues.map((issueDB) => {
        if (issueDB !== undefined && issueDB.id !== 0 && issueDB.times) {
            issueDB.times = new Map(Object.entries(issueDB.times));
        } else {
            issueDB.times = new Map()
        }
        
        return issueDB
    })
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

    const time:number|undefined = issue.times.get(date)
    return (time === undefined ? 0 : time)
}


//SET
export const setIssueTimeDB = (id: number, started:boolean, time:number, date?:string):void => {
    const issue = getIssueDBByID(id)

    if (date === undefined) date = toDay()

    if (issue) {
        issue.times.set(date, time)
        issue.started= started

        setIssueDB(issue)
    }
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
    let jissue = {times:{}}

    issues.map((issue) => {
        jissue = issue
        jissue.times = Object.fromEntries(issue.times)
    })

    localStorage.setItem(ISSUESKEY, JSON.stringify(issues))
}

export const setIssuesGitHub = (issues_github:IIssueAll[]):IDBIssue[] => {
    const issuesDB:IDBIssue[] = getIssuesDB()
    let newIssuesDB:IDBIssue[] = []

    for (const issue_github of issues_github) {

        const newIssueDB:IDBIssue = {
            id : issue_github.id,
            title: issue_github.title,
            url: issue_github.html_url,
            started: false,
            total: 0,
            times: new Map()
        }

        newIssueDB.times.set(toDay(), 0)
        
        const issueDB:IDBIssue|undefined = findIssueByID(issue_github.id, issuesDB)

        if (issueDB !== undefined && issueDB.id !== 0 && issueDB.times) {
            if (issueDB.times.size) {
                newIssueDB.times = issueDB.times    
            } else {
                newIssueDB.times = new Map(Object.entries(issueDB.times))
            }
       
            newIssueDB.total = issueDB.total
        }

        newIssuesDB.push(newIssueDB)
    }

    setIssuesDB(newIssuesDB)

    return newIssuesDB
}
