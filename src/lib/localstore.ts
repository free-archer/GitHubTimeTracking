import { IDBIssue, IIssueTime } from '../types/dbissues'
import { IIssueAll } from '../types/issues'

//Timer
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

//Issues

const ISSUESKEY = 'USSUES'

const empty_issue:IDBIssue = {
    id: 0,
    title: '',
    url: '',
    started: false,
    time: {
        date: new Date(),
        time: 0,
        minute: 0,
        hour: 0,
        time_string: '' 
    }
}

export const getIssueTimeDB = (id: number):IIssueTime => {
    const issue:IDBIssue = getIssueDBByID(id)
    const issue_time:IIssueTime = issue.time
    return issue_time
}

export const setIssueTimeDB = (id: number, started:boolean, time:number):void => {
    const issue = getIssueDBByID(id)

    issue.time.time = time
    issue.started= started

    setIssueDB(issue)

}

export const getIssuesDB = ():IDBIssue[] => {
    const issues:IDBIssue[] = JSON.parse(localStorage.getItem(ISSUESKEY) || JSON.stringify([empty_issue]))
    return issues
}

export const getIssueDBByID = (id: number):IDBIssue => {
    const issues:IDBIssue[] = getIssuesDB()

    const issue:IDBIssue|undefined = findIssueByID(id, issues)
    return issue || empty_issue
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
    // let curIssue:IDBIssue = findIssueByID(issue.id, issues)
    //     if (curIssue.id !== 0) {
    //         curIssue = issue
            
    //         setIssuesDB(issues)
    //     }
    }


}

export const setIssuesDB = (issues:IDBIssue[]):void => {
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
            time: {
                time: 0
            }
        }
        
        const issueDB:IDBIssue = findIssueByID(issue_github.id, issuesDB)

        if (issueDB.id !== 0) {
            newIssueDB.time.time = issueDB.time.time
            newIssueDB.started = issueDB.started
        }

        newIssuesDB.push(newIssueDB)
    }


    // const newIssuesDB:IDBIssue[] = issues_github.map((elem) => {
    //     const issueDB:IDBIssue = {
    //         id : elem.id,
    //         title: elem.title,
    //         time: {
    //             time: 0
    //         }
    //     }

    //     return issueDB
    // })

    localStorage.setItem(ISSUESKEY, JSON.stringify(newIssuesDB))

    return newIssuesDB
}

const findIssueByID = (id:number, issues:IDBIssue[]):IDBIssue => {
    if (!issues || issues.length == 0) {
        return empty_issue
    }
    const issue:IDBIssue|undefined = issues.find((value) => (value.id === id))

    return issue || empty_issue
}