export interface ISettings {
    key: string|'',
    username: string|'',
    reponame: string|'',
    pomodoroMaxValue: number
}

export interface IContextSettings {
    settings: ISettings,
}