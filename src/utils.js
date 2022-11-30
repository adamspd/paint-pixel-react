
const saveJwt = (jwt) => {
    localStorage.setItem('jwt', jwt)
}
const logout = () => {
    localStorage.removeItem('jwt')
}
const isAuthenticate = () => {
    if (localStorage.getItem('jwt')) return true 
    else return false
}
const getJwt = () => {
    return localStorage.getItem('jwt')
}

module.exports = { saveJwt, logout, isAuthenticate, getJwt}