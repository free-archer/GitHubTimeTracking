
export interface ILabel {
    id: number|string;
    name: string;
    color: string;
}

export interface IDBIssue {
    id: number;
    title: string;
    url: string,
    started:boolean,
    curtime: number|0,
    labels: ILabel[]
}

