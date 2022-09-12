export interface IIssueTime {
    date: Date,
    time_hour: number,
    time_string: string 
}

export interface IDBIssue {
    id: string;
    title: string;
    time: IIssueTime
}