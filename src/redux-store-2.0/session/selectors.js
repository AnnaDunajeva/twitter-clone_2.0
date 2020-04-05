export const getAuthedUserId = () => {
    return (state) => state.session.userId || localStorage.getItem('userId')
}

export const getSessionFetchStatus = () => (state) => state.session.fetchStatus || null