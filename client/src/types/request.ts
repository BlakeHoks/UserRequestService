export interface IRequestData {
  id: number
  request_type: string
  description: string
  author: string
  date: string
  status: string
}

export type RequestCreate = Omit<IRequestData, 'id' | 'status'>
