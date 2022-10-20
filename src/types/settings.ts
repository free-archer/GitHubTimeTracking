export interface ISettings {
    key: string|'',
    username: string|'',
    reponame: string|'',
    pomodoroMaxValue: number
}

export interface IContextSettings {
    settings: ISettings,
    filters: {
        labels: string
    }
    setFilterLabels: React.Dispatch<React.SetStateAction<string>> | undefined
}