const saveJwt = (jwt) => {
    localStorage.setItem('jwt', jwt)
}

const logout = () => {
    localStorage.clear();
}

const isAuthenticate = () => {
    console.log("IsAuthenticate called");
    console.log("jwt :" + localStorage.getItem('jwt'));
    if (localStorage.getItem('jwt')) return true 
    else return false
}

const getJwt = () => {
    return localStorage.getItem('jwt')
}

const saveTheme = (theme) => {
    localStorage.setItem('theme', theme)
}

const getTheme = () => {
    return localStorage.getItem('theme');
}

const switchTheme = async (themee) => {
   const theme  = themee === 'light' ? 'dark' : 'light';
    localStorage.setItem('theme', theme);
    return theme;


}

module.exports = { saveJwt, logout, isAuthenticate, getJwt, saveTheme, getTheme ,switchTheme}
