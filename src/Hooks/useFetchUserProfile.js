import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAuthedUserId } from "../redux-store-2.0/session/selectors";
import { getUserStatusById } from "../redux-store-2.0/entities/users/selectors";
import { getUser } from "../redux-store-2.0/api/users";

const useFetchUserProfile = ({ userId }) => {
    const authedUser = useSelector(getAuthedUserId());
    const userFetchStatus = useSelector(getUserStatusById(userId));
    const dispatch = useDispatch();

    React.useEffect(() => {
        if (authedUser && !userFetchStatus) {
            dispatch(
                getUser({
                    userId
                })
            );
        }
    }, [authedUser, dispatch, userId, userFetchStatus]);
};
export default useFetchUserProfile;
