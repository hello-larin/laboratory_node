import { combineReducers, configureStore } from "@reduxjs/toolkit"
import dataReducer from "./slices/CatalogSlice"


export default configureStore({
    reducer: combineReducers({
        search: dataReducer
    })
})