const GITHUBKEY = 'GITHUBKEY'

export const saveGitHubKey = (key:string) => {
    localStorage.setItem("GITHUBKEY", key)
}

export const getGitHubKey = ():string => {
    return localStorage.getItem("GITHUBKEY") || ''
}

export const clearGitHubKey = () => {
    localStorage.setItem("GITHUBKEY", '')
}