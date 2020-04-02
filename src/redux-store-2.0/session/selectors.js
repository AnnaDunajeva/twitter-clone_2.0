export const getAuthedUserId = () => {
    return (state) => state.session.userId
}

export const getSessionFetchStatus = () => (state) => state.session.fetchStatus || null