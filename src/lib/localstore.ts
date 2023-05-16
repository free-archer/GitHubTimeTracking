import { ISettings } from '../types/settings'

//GITHUBKEY
const GITHUBKEY = 'GITHUBKEY'

export const saveGitHubKey = (key:string) => {
    localStorage.setItem(GITHUBKEY, key)
}

export const getGitHubKey = ():string => {
    return localStorage.getItem(GITHUBKEY) || ''
}

export const clearGitHubKey = () => {
    localStorage.setItem(GITHUBKEY, '')
}

//RepositoryName
const REPOKEY = 'REPONAME'

export const saveRepositoryName = (name:string):void => {
    localStorage.setItem(REPOKEY, name)
}

export const getRepositoryName = ():string => {
    return localStorage.getItem(REPOKEY) || ''
}

//User name
const USERKEY = 'USERNAME'

export const saveUserName = (name:string):void => {
    localStorage.setItem(USERKEY, name)
}

export const getUserName= ():string => {
    return localStorage.getItem(USERKEY) || ''
}

//Pomodoro work tome
const POMODOROWORK = 'POMODOROWORK'

export const savePomodoroWorkTime = (pomodoroMaxValue:number):void => {
    localStorage.setItem(POMODOROWORK, pomodoroMaxValue.toString())
}

export const getPomodoroWorkTime = ():number => {
    const stime = localStorage.getItem(POMODOROWORK) || ''

    return parseInt(stime)
}

export const saveSettings= (settings:ISettings):void => {
    saveUserName(settings.username)
    saveRepositoryName(settings.reponame)
    saveGitHubKey(settings.key)
    savePomodoroWorkTime(settings.pomodoroMaxValue)
}

export const getSettings= ():ISettings => {
    const username = getUserName()
    const reponame = getRepositoryName()
    const key = getGitHubKey()
    const pomodoroMaxValue = getPomodoroWorkTime()

    return {
        key: key,
        username: username,
        reponame: reponame,
        pomodoroMaxValue: pomodoroMaxValue,
    }
}
