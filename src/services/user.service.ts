import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'
import { User, Move } from 'src/models/user.model'

const LOGGED_IN_USER_KEY = 'loggedInUser'
const FRIEND_MAX_SHOWN_TRANSFERS = 3
@Injectable({
  providedIn: 'root',
})
export class UserService {
  user: User | null = {
    _id: 'u101',
    name: 'Yehonatan Yosefi',
    isAdmin: true,
    dollars: 100,
    moves: [],
  }

  constructor() {
    const storedUser = localStorage.getItem(LOGGED_IN_USER_KEY)
    if (storedUser) {
      this.user = JSON.parse(storedUser)
    } else {
      this.user = null
    }
    this._loggedInUser$.next(this.user)
  }

  private _loggedInUser$ = new BehaviorSubject<User | null>(this.user)
  public loggedInUser$ = this._loggedInUser$.asObservable()
  private _friendTransfers$ = new BehaviorSubject<Move[] | []>([])
  public friendTransfers$ = this._friendTransfers$.asObservable()

  getLoggedInUser() {
    return this._loggedInUser$.value
  }

  setNewUser(newUser: User) {
    this._loggedInUser$.next(newUser)
    localStorage.setItem(LOGGED_IN_USER_KEY, JSON.stringify(newUser))
  }

  transferFunds(amount: number, to: string, toId: string) {
    const currentUser = this.getLoggedInUser()
    if ((currentUser && currentUser.dollars < amount) || !currentUser) return
    currentUser.dollars = currentUser.dollars - amount
    localStorage.setItem(LOGGED_IN_USER_KEY, JSON.stringify(currentUser))
    this._loggedInUser$.next(currentUser)
    this.addMove({ to, amount, at: new Date(), toId })
  }

  addMove(move: Move) {
    const currentUser = this.getLoggedInUser()
    if (!currentUser) return
    currentUser.moves = [move, ...(currentUser?.moves || [])]
    this._loggedInUser$.next(currentUser)
    localStorage.setItem(LOGGED_IN_USER_KEY, JSON.stringify(currentUser))
  }

  public setFriendTransfers(friendId: string): void {
    const loggedInUser = this.getLoggedInUser()
    if (!loggedInUser) return

    const friendTransfers = loggedInUser.moves
      .filter((move) => move.toId === friendId)
      .slice(0, FRIEND_MAX_SHOWN_TRANSFERS)
    this._friendTransfers$.next(friendTransfers)
  }
}
