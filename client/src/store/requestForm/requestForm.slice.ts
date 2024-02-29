import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RequestCreate } from '../../types/request'

const initialState: RequestCreate = {
  request_type: '',
  description: '',
  author: '',
  date: '',
}

export const requestFormSlice = createSlice({
  name: 'requestForm',
  initialState: { request: initialState },
  reducers: {
    updateRequestType: ({ request }, action: PayloadAction<string>) => {
      request.request_type = action.payload
    },
    updateDescription: ({ request }, action: PayloadAction<string>) => {
      request.description = action.payload
    },
    updateAuthor: ({ request }, action: PayloadAction<string>) => {
      request.author = action.payload
    },
    updateDate: ({ request }, action: PayloadAction<string>) => {
      request.date = action.payload
    },
  },
})

export const { actions, reducer } = requestFormSlice
