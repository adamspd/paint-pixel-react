// localStorage

const saveJwt = (jwt) => {
    sessionStorage.setItem('jwt', jwt)

}

const logout = () => {
    sessionStorage.clear();
}

const isAuthenticate = () => {
    if (sessionStorage.getItem('jwt')) return true
    else return false
}

const getJwt = () => {
    return sessionStorage.getItem('jwt')
}

const saveTheme = (theme) => {
    sessionStorage.setItem('theme', theme)
}

const getTheme = () => {
    return sessionStorage.getItem('theme');
}

const switchTheme = async (themee) => {
    const theme = themee === 'light' ? 'dark' : 'light';
    sessionStorage.setItem('theme', theme);
    return theme;
}
const saveUser = (currentUser) => {
    const {username} = currentUser
    sessionStorage.setItem('user', username)
}

const saveUsername = (username) => {
    sessionStorage.setItem('username', username);
}

const saveUserFirstName = (firstName) => {
    sessionStorage.setItem('firstName', firstName);
}

const saveUserLastName = (lastName) => {
    sessionStorage.setItem('lastName', lastName);
}

module.exports = {
    saveJwt, logout, isAuthenticate, getJwt, saveTheme, getTheme, switchTheme, saveUser, saveUsername,
    saveUserFirstName, saveUserLastName
}
