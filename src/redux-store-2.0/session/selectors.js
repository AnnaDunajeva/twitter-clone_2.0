export const getAuthedUserId = () => {
    return (state) => state.session.userId
}