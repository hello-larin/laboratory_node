import { combineReducers, configureStore } from "@reduxjs/toolkit"
import dataReducer from "./slices/CatalogSlice"
import authReducer from "./slices/AuthSlice"
import procurementsReducer from "./slices/ProcurementsSlice"
import currentProcurementReducer from "./slices/CurrentProcurementSlice"

export default configureStore({
    reducer: combineReducers({
        search: dataReducer,
        auth: authReducer,
        procurements: procurementsReducer,
        currentProcurement: currentProcurementReducer,
    })
})