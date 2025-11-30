import { createSlice } from "@reduxjs/toolkit"

let initialState = {
    loginDatas : [{}]
} 

export const loginSlice = createSlice({
    name: 'loginInfo',
    initialState,
    reducers: {
        addLogininfo: (state, action) => {
            
        }
    }
})