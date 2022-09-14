export interface IIssueTime {
    date?: string,
    time: number,
}

export interface IDBIssue {
    id: number;
    title: string;
    url: string,
    time: IIssueTime,
    times?: IIssueTime[],
    started:boolean,
}