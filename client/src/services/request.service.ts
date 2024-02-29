import axios from 'axios'
import { IRequestData, RequestCreate } from '../types/request'

export const RequestService = {
  async getAll(): Promise<IRequestData[] | null> {
    try {
      const response = await axios.get('http://localhost:3000/request')
      return response.data
    } catch (error) {
      return null
    }
  },

  async create(requestData: RequestCreate) {
    try {
      await axios.post('http://localhost:3000/request', requestData)
    } catch (error) {}
  },
}
