import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface MailerRegister {
    name: string,
    email: string,
    subject: string,
    lastname: string,
}

interface MailerRegisterState {
    nodemailers: MailerRegister[];
}

const initialState: MailerRegisterState = {
    nodemailers: [],
}

const nodemailerRegisterSlice = createSlice({
    name: 'nodemailer',
    initialState,
    reducers: {
        addMailerRegister: (state, action: PayloadAction<MailerRegister>) => {
            state.nodemailers.push(action.payload)
        }
    }
})
 
export const { addMailerRegister } = nodemailerRegisterSlice.actions;
export default nodemailerRegisterSlice.reducer;
