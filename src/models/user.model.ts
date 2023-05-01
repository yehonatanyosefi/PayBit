export interface User {
  _id: string
  name: string
  isAdmin: boolean
  dollars: number
  moves: Move[]
}
export interface Move {
  to: string
  at: Date
  amount: number
  toId: string
}
