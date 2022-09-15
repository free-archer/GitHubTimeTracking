export interface IDBIssue {
    id: number;
    title: string;
    url: string,
    times: Map<string, number>,
    total: number,
    started:boolean,
}