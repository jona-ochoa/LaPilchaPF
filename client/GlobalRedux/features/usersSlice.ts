import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "GlobalRedux/api/usersApi";


interface UserState {
    users: User[];
}

const initialState: UserState = {
    users: [],
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        addUser: (state, action: PayloadAction<User>) => {
            state.users.push(action.payload)
        },
        setUsers: (state, action: PayloadAction<User[]>) => {
            state.users = action.payload;
        },
}})

export const { addUser, setUsers } = userSlice.actions;
export default userSlice.reducer;