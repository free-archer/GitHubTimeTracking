import { create } from 'zustand'
import { IDBIssue, ILabel } from '../types/dbissues'
import { IIssueAll } from '../types/issues'

export const useIssuesStore = create((set) => ({
    issuesDB: [],
    setDBIssues: (issues_github:IIssueAll[]) => set((state:IDBIssue[]) => ({issuesDB:setIssuesGitHub(state, issues_github)}))
}))
// export const useBearStore = create((set) => ({
//   bears: 0,
//   increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
//   decreasePopulation: () => set((state) => ({ bears: state.bears - 1 })),
//   removeAllBears: () => set({ bears: 0 }),
// }))


export const setIssuesGitHub = (state:any, issues_github:IIssueAll[]):IDBIssue[] => {
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

        // const issueDB:IDBIssue|undefined = findIssueByID(issue_github.id, issuesDB)
        if (state.issuesDB !== undefined) {
            const issueDB:IDBIssue|undefined = state.issuesDB.find((value:IDBIssue ) => (value.id === issue_github.id))

            if (issueDB !== undefined && issueDB.id !== 0) {

                newIssueDB.curtime = issueDB.curtime
            }
        }
        newIssuesDB.push(newIssueDB)
    }

    return newIssuesDB
}

const findIssueByID = (id:number, issues:IDBIssue[]):IDBIssue|undefined => {
    if (!issues || issues.length == 0) {
        return undefined
    }
    const issue:IDBIssue|undefined = issues.find((value) => (value.id === id))

    return issue
}
