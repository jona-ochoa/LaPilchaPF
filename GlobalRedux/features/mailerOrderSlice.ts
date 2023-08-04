import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface MailerOrder {
    name: string,
    email: string,
    subject: string,
    buyOrder: string | Array<{
        id: string;
        title: string;
        unit_price: string;
        quantity: number;
      }>;
}

interface MailerOrderState {
    mailersOrders: MailerOrder[];
}

const initialState: MailerOrderState = {
    mailersOrders: [],
}

const mailerOrderSlice = createSlice({
    name: 'mailerOrder',
    initialState,
    reducers: {
        addMailerOrder: (state, action: PayloadAction<MailerOrder>) => {
            state.mailersOrders.push(action.payload)
        }
    }
})
 
export const { addMailerOrder } = mailerOrderSlice.actions;
export default mailerOrderSlice.reducer;
