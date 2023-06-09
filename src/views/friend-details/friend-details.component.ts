import { Component, OnInit, OnDestroy } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { FriendService } from '../../services/friend.service'
import { Friend } from '../../models/friend.model'
import { Observable, map, takeUntil, Subject, switchMap } from 'rxjs'
import { UserService } from 'src/services/user.service'
import { Move } from 'src/models/user.model'

@Component({
  selector: 'friend-details',
  templateUrl: './friend-details.component.html',
  styleUrls: ['./friend-details.component.scss'],
})
export class FriendDetailsComponent implements OnInit, OnDestroy {
  constructor(
    private friendService: FriendService,
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService
  ) {}

  friend: Friend | null = null
  friend$!: Observable<Friend>
  destroySubject$ = new Subject<null>()

  friendTransfers$!: Observable<Move[]>

  ngOnInit(): void {
    this.friend$ = this.route.data.pipe(
      map((data) => data['friend']),
      switchMap(async (friend) => {
        this.userService.setFriendTransfers(friend._id)
        this.friendTransfers$ = this.userService.friendTransfers$
        return friend
      })
    )
    this.friend$.pipe(takeUntil(this.destroySubject$)).subscribe((friend) => {
      this.friend = friend
    })
  }

  onBack(): void {
    this.router.navigateByUrl('/friend')
  }

  onDeleteFriend(): void {
    if (!this.friend) return
    this.friendService.deleteFriend(this.friend._id).subscribe({
      next: () => this.router.navigateByUrl('/friend'),
      error: (err) => console.error('Error deleting friend', err),
    })
  }

  ngOnDestroy(): void {
    this.destroySubject$.next(null)
    this.destroySubject$.complete()
  }
}
