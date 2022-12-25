import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../'

type Status = 
    | 'checking'
    | 'not-authenticated'
    | 'authenticated'

// Define a type for the slice state
interface AuthState {
  status:       Status,
  uid:          string | null,
  email:        string | null,
  displayName:  string | null,
  photoURL:     string | null,
  errorMessage: string | null
}

interface AuthPayload {
    uid:          string,
    email:        string,
    displayName:  string,
    photoURL:     string,
    errorMessage: string
}

// Define the initial state using that type
const initialState: AuthState = {
  status:       'checking',
  uid:          null,
  email:        null,
  displayName:  null,
  photoURL:     null,
  errorMessage: null
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    checkingCredentials: ( state ) => {
        state.status        = 'checking'
        state.uid           = null
        state.email         = null
        state.displayName   = null
        state.photoURL      = null
        state.errorMessage  = null
    },
    login: ( state, { payload }: PayloadAction<AuthPayload> ) => {
        state.status        = 'authenticated'
        state.uid           = payload.uid
        state.email         = payload.email
        state.displayName   = payload.displayName
        state.photoURL      = payload.photoURL
        state.errorMessage  = null
    },
    logout: ( state, action ) => {
        state.status = 'not-authenticated', // 'checking', 'not-authenticated', 'authenticated'
        state.uid = null;
        state.email = null;
        state.displayName = null;
        state.photoURL = null;
        state.errorMessage = action.payload?.errorMessage;
    },
  },
})

export const { checkingCredentials, login, logout } = authSlice.actions

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value

export default authSlice.reducer