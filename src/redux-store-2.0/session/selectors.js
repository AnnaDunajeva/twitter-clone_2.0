import {getUserIdFromCookie} from '../../utils/helpers'

export const getAuthedUserId = () => (state) => state.session.userId || getUserIdFromCookie()

export const getSessionFetchStatus = () => (state) => state.session.fetchStatus || null

export const isSessionError = () => (state) => state.session.error ? true : false 