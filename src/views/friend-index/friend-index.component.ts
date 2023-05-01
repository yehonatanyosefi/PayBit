import { Component } from '@angular/core'
import { Observable, Subscription } from 'rxjs'
import { Friend } from 'src/models/friend.model'
import { FriendService } from 'src/services/friend.service'
@Component({
  selector: 'friend-index',
  templateUrl: './friend-index.component.html',
  styleUrls: ['./friend-index.component.scss'],
})
export class FriendIndexComponent {
  constructor(private friendService: FriendService) {}
  // subscription!: Subscription
  friends: Friend[] | null = null
  friends$!: Observable<Friend[]>

  ngOnInit() {
    this.friends$ = this.friendService.friends$
  }

  ngOnDestroy() {}
}
