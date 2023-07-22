import { configureStore } from "@reduxjs/toolkit";
import billReducer from "./slices/bill-slice";
import { useSelector, TypedUseSelectorHook} from 'react-redux';

export const store = configureStore({
    reducer: {
        bill: billReducer,
    }
});


export const useStoreSelector: TypedUseSelectorHook<ReturnType<typeof store.getState>> = useSelector;
export type AppDispatch = typeof store.dispatch;