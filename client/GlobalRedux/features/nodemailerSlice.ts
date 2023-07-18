import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Mailer {
    name: string,
    email: string,
    subject: string,
    message: string,
}

interface MailerState {
    mailers: Mailer[];
}

const initialState: MailerState = {
    mailers: [],
}

const mailerSlice = createSlice({
    name: 'mailer',
    initialState,
    reducers: {
        addMailer: (state, action: PayloadAction<Mailer>) => {
            state.mailers.push(action.payload)
        }
    }
})
 
export const { addMailer } = mailerSlice.actions;
export default mailerSlice.reducer;