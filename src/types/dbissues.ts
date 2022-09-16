export interface ITime {
    date: string,
    time: number|0,
}

export interface IDBIssue {
    id: number;
    title: string;
    url: string,
    times: ITime[]|undefined,
    total: number|0,
    started:boolean,
    curtime: number|0
}