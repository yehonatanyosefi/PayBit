import { Injectable } from '@angular/core'
import { BehaviorSubject, throwError, from, tap, retry, catchError } from 'rxjs'
import { storageService } from './async-storage.service'
import { HttpErrorResponse } from '@angular/common/http'
import { Friend, FriendFilter } from '../models/friend.model'
import { getPhoto } from './photo.service'
const FRIEND_KEY = 'friendsDB'

@Injectable({
  providedIn: 'root',
})
export class FriendService {
  private _malePhotoNum = 10
  private _femalePhotoNum = 9

  private _friends$ = new BehaviorSubject<Friend[]>([])
  public friends$ = this._friends$.asObservable()

  private _friendFilter$ = new BehaviorSubject<FriendFilter>({ term: '' })
  public friendFilter$ = this._friendFilter$.asObservable()

  constructor() {
    const friends = JSON.parse(localStorage.getItem(FRIEND_KEY) || 'null')
    if (!friends || friends.length === 0) {
      localStorage.setItem(FRIEND_KEY, JSON.stringify(this._createFriends()))
    }
  }

  public loadFriends() {
    return from(storageService.query(FRIEND_KEY)).pipe(
      tap((friends) => {
        const filterBy = this._friendFilter$.value
        if (filterBy && filterBy.term) {
          friends = this._filter(friends, filterBy.term)
        }
        this._friends$.next(this._sort(friends))
      }),
      retry(1),
      catchError(this._handleError)
    )
  }

  public setFilter(friendFilter: FriendFilter) {
    this._friendFilter$.next({ ...friendFilter })
    this.loadFriends().subscribe()
  }

  public getFriendById(id: string): Promise<Friend> {
    return storageService.get(FRIEND_KEY, id)
  }

  public deleteFriend(id: string) {
    return from(storageService.remove(FRIEND_KEY, id)).pipe(
      tap(() => {
        let friends = this._friends$.value
        friends = friends.filter((friend) => friend._id !== id)
        this._friends$.next(friends)
      }),
      retry(1),
      catchError(this._handleError)
    )
  }

  public saveFriend(friend: Friend) {
    return friend._id ? this._updateFriend(friend) : this._addFriend(friend)
  }

  public getEmptyFriend() {
    return {
      name: '',
      email: '',
      phone: '',
      imgUrl:
        Math.random() > 0.5
          ? getPhoto(
              this._malePhotoNum > 20
                ? Math.floor(Math.random() * 20)
                : this._malePhotoNum++,
              'male'
            )
          : getPhoto(
              this._femalePhotoNum > 20
                ? Math.floor(Math.random() * 20)
                : this._femalePhotoNum++,
              'female'
            ),
    }
  }

  private _updateFriend(friend: Friend) {
    return from(storageService.put(FRIEND_KEY, friend)).pipe(
      tap((updatedFriend) => {
        const friends = this._friends$.value
        this._friends$.next(
          friends.map((friend) =>
            friend._id === updatedFriend._id ? updatedFriend : friend
          )
        )
      }),
      retry(1),
      catchError(this._handleError)
    )
  }

  private _addFriend(friend: Friend) {
    const newFriend = new Friend(
      friend.name,
      friend.email,
      friend.phone,
      friend.imgUrl,
      (friend._id = this._getRandomId())
    )
    return from(storageService.post(FRIEND_KEY, newFriend)).pipe(
      tap((newFriend) => {
        const friends = this._friends$.value
        this._friends$.next([...friends, newFriend])
      }),
      retry(1),
      catchError(this._handleError)
    )
  }

  private _sort(friends: Friend[]): Friend[] {
    return friends.sort((a, b) => {
      if (a.name.toLocaleLowerCase() < b.name.toLocaleLowerCase()) return -1
      if (a.name.toLocaleLowerCase() > b.name.toLocaleLowerCase()) return 1
      return 0
    })
  }

  private _filter(friends: Friend[], term: string) {
    term = term.toLocaleLowerCase()
    return friends.filter((friend) => {
      return (
        friend.name.toLocaleLowerCase().includes(term) ||
        friend.phone.toLocaleLowerCase().includes(term) ||
        friend.email.toLocaleLowerCase().includes(term)
      )
    })
  }

  private _createFriends() {
    const friends = [
      {
        _id: '5a56640269f443a5d64b32ca',
        name: 'Ochoa Hyde',
        email: 'ochoahyde@renovize.com',
        phone: '+1 (968) 593-3824',
        moves: [],
        imgUrl: getPhoto(0, 'female'),
      },
      {
        _id: '5a5664025f6ae9aa24a99fde',
        name: 'Hallie Mclean',
        email: 'halliemclean@renovize.com',
        phone: '+1 (948) 464-2888',
        moves: [],
        imgUrl: getPhoto(1, 'female'),
      },
      {
        _id: '5a56640252d6acddd183d319',
        name: 'Parsons Norris',
        email: 'parsonsnorris@renovize.com',
        phone: '+1 (958) 502-3495',
        moves: [],
        imgUrl: getPhoto(0, 'male'),
      },
      {
        _id: '5a566402ed1cf349f0b47b4d',
        name: 'Rachel Lowe',
        email: 'rachellowe@renovize.com',
        phone: '+1 (911) 475-2312',
        moves: [],
        imgUrl: getPhoto(2, 'female'),
      },
      {
        _id: '5a566402abce24c6bfe4699d',
        name: 'Dominique Soto',
        email: 'dominiquesoto@renovize.com',
        phone: '+1 (807) 551-3258',
        moves: [],
        imgUrl: getPhoto(1, 'male'),
      },
      {
        _id: '5a566402a6499c1d4da9220a',
        name: 'Shana Pope',
        email: 'shanapope@renovize.com',
        phone: '+1 (970) 527-3082',
        moves: [],
        imgUrl: getPhoto(3, 'female'),
      },
      {
        _id: '5a566402f90ae30e97f990db',
        name: 'Faulkner Flores',
        email: 'faulknerflores@renovize.com',
        phone: '+1 (952) 501-2678',
        moves: [],
        imgUrl: getPhoto(2, 'male'),
      },
      {
        _id: '5a5664027bae84ef280ffbdf',
        name: 'Holder Bean',
        email: 'holderbean@renovize.com',
        phone: '+1 (989) 503-2663',
        moves: [],
        imgUrl: getPhoto(3, 'male'),
      },
      {
        _id: '5a566402e3b846c5f6aec652',
        name: 'Rosanne Shelton',
        email: 'rosanneshelton@renovize.com',
        phone: '+1 (968) 454-3851',
        moves: [],
        imgUrl: getPhoto(4, 'female'),
      },
      {
        _id: '5a56640272c7dcdf59c3d411',
        name: 'Pamela Nolan',
        email: 'pamelanolan@renovize.com',
        phone: '+1 (986) 545-2166',
        moves: [],
        imgUrl: getPhoto(5, 'female'),
      },
      {
        _id: '5a5664029a8dd82a6178b15f',
        name: 'Roy Cantu',
        email: 'roycantu@renovize.com',
        phone: '+1 (929) 571-2295',
        moves: [],
        imgUrl: getPhoto(4, 'male'),
      },
      {
        _id: '5a5664028c096d08eeb13a8a',
        name: 'Ollie Christian',
        email: 'olliechristian@renovize.com',
        phone: '+1 (977) 419-3550',
        moves: [],
        imgUrl: getPhoto(5, 'male'),
      },
      {
        _id: '5a5664026c53582bb9ebe9d1',
        name: 'Nguyen Walls',
        email: 'nguyenwalls@renovize.com',
        phone: '+1 (963) 471-3181',
        moves: [],
        imgUrl: getPhoto(6, 'male'),
      },
      {
        _id: '5a56640298ab77236845b82b',
        name: 'Glenna Santana',
        email: 'glennasantana@renovize.com',
        phone: '+1 (860) 467-2376',
        moves: [],
        imgUrl: getPhoto(6, 'female'),
      },
      {
        _id: '5a56640208fba3e8ecb97305',
        name: 'Malone Clark',
        email: 'maloneclark@renovize.com',
        phone: '+1 (818) 565-2557',
        moves: [],
        imgUrl: getPhoto(7, 'male'),
      },
      {
        _id: '5a566402abb3146207bc4ec5',
        name: 'Floyd Rutledge',
        email: 'floydrutledge@renovize.com',
        phone: '+1 (807) 597-3629',
        moves: [],
        imgUrl: getPhoto(8, 'male'),
      },
      {
        _id: '5a56640298500fead8cb1ee5',
        name: 'Grace James',
        email: 'gracejames@renovize.com',
        phone: '+1 (959) 525-2529',
        moves: [],
        imgUrl: getPhoto(7, 'female'),
      },
      {
        _id: '5a56640243427b8f8445231e',
        name: 'Tanner Gates',
        email: 'tannergates@renovize.com',
        phone: '+1 (978) 591-2291',
        moves: [],
        imgUrl: getPhoto(9, 'male'),
      },
      {
        _id: '5a5664025c3abdad6f5e098c',
        name: 'Lilly Conner',
        email: 'lillyconner@renovize.com',
        phone: '+1 (842) 587-3812',
        moves: [],
        imgUrl: getPhoto(8, 'female'),
      },
    ]
    return friends
  }

  private _handleError(err: HttpErrorResponse) {
    console.log('error in friend service:', err)
    return throwError(() => err)
  }

  private _getRandomId(length = 8): string {
    let result = ''
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length))
    }
    return result
  }
}
