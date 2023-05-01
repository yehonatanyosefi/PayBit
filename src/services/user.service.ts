import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'
import { User, Move } from 'src/models/user.model'
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
    const storedUser = localStorage.getItem('loggedInUser')
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
    localStorage.setItem('loggedInUser', JSON.stringify(newUser))
  }

  addMove(move: Move) {
    const currentUser = this.getLoggedInUser()
    if (currentUser) currentUser.moves = [...(currentUser?.moves || []), move]
    this._loggedInUser$.next(currentUser)
    localStorage.setItem('loggedInUser', JSON.stringify(currentUser))
  }

  transferFunds(amount: number, to: string, toId: string) {
    const user = this.getLoggedInUser()
    if ((user && user.dollars < amount) || !user) return
    user.dollars = user.dollars - amount
    localStorage.setItem('loggedInUser', JSON.stringify(user))
    this.addMove({ to, amount, at: new Date(), toId })
  }
  loadFriendTransfers(friendId: string): void {
    //TODO finish this
    const currentUser = this.getLoggedInUser()
    if (!currentUser) return this._friendTransfers$.next([])
    this._friendTransfers$.next(
      currentUser?.moves?.filter((move) => move?.toId === friendId).splice(0, 3)
    )
  }
  getFriendTransfers(friendId: string): Move[] {
    const currentUser = this.getLoggedInUser()
    if (!currentUser) return []
    return currentUser?.moves
      ?.filter((move) => move?.toId === friendId)
      .splice(0, 3)
  }
}
