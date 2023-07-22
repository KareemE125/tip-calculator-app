import { Bill } from "@/types/bill";
import { createSlice, PayloadAction } from "@reduxjs/toolkit"; 

type BillState={
    bill: Bill,
    tipperperson: number,
    totalperperson: number,
}

export const billSlice = createSlice({
    name: "bill",
    initialState: {} as BillState,
    reducers: {
        calcBill: (state, action: PayloadAction<Bill>) => { 
            state.bill = action.payload;
            if(!action.payload.tip){ state.bill.tip = 0; }

            state.tipperperson = action.payload.tip / 100 * action.payload.amount / action.payload.numOfPeople; 
            
            state.totalperperson = action.payload.amount / action.payload.numOfPeople + state.tipperperson; 

            return state; 
        },
        resetBill: (state) => { state = {} as BillState; return state; },
    }
});

export const { calcBill, resetBill } = billSlice.actions;
export default billSlice.reducer;