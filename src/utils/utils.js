// localStorage

const saveJwt = (jwt) => {
    sessionStorage.setItem('jwt', jwt)
        
}

const logout = () => {
    sessionStorage.clear();
}

const isAuthenticate = () => {
    console.log("IsAuthenticate called");
    console.log("jwt :" + sessionStorage.getItem('jwt'));
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
   const theme  = themee === 'light' ? 'dark' : 'light';
    sessionStorage.setItem('theme', theme);
    return theme;


}

module.exports = { saveJwt, logout, isAuthenticate, getJwt, saveTheme, getTheme ,switchTheme}
