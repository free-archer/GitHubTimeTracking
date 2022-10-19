import react from 'react'
import { ISettings, IContextSettings } from '../types/settings'
import { getSettings } from '../lib/localstore'

const local_settings:ISettings = getSettings()

export const settings:IContextSettings = {
    settings: {
        key: local_settings.key,
        username: local_settings.username,
        reponame: local_settings.reponame,
        pomodoroMaxValue: local_settings.pomodoroMaxValue
    },
}

export const SettingsContext = react.createContext(settings)
