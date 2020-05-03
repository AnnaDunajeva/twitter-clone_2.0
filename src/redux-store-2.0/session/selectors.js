// export const getAuthedUserId = () => {
//     return (state) => state.session.userId || localStorage.getItem('userId')
// }
export const getAuthedUserId = () => {
    return () => document.cookie.replace(/(?:(?:^|.*;\s*)id\s*=\s*([^;]*).*$)|^.*$/, "$1")
}
export const getSessionFetchStatus = () => (state) => state.session.fetchStatus || null

export const isSessionError = () => (state) => state.session.error ? true : false