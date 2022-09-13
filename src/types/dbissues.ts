export interface IIssueTime {
    date?: Date,
    time: number,
    minute?: number,
    hour?: number,
    time_string?: string 
}

export interface IDBIssue {
    id: number;
    title: string;
    time: IIssueTime
}