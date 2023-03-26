export interface ITime {
    date: string,
    time: number|0,
}

export interface ILabel {
    id: number|string;
    name: string;
    color: string;
}

export interface IDBIssue {
    id: number;
    title: string;
    url: string,
    times: ITime[]|undefined,
    total: number|0,
    started:boolean,
    curtime: number|0,
    labels: ILabel[]
}

