import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FriendService } from '../../services/friend.service';
import { Friend } from '../../models/friend.model';
import { Subscription, filter, map } from 'rxjs';

@Component({
  selector: 'friend-edit',
  templateUrl: './friend-edit.component.html',
  styleUrls: ['./friend-edit.component.scss'],
})
export class FriendEditComponent implements OnInit, OnDestroy {
  constructor(
    private friendService: FriendService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  friend = this.friendService.getEmptyFriend() as Friend;
  subscription!: Subscription;

  ngOnInit() {
    this.subscription = this.route.data
      .pipe(
        map((data) => data['friend']),
        filter((friend) => friend)
      )
      .subscribe((friend) => (this.friend = friend));
  }

  onSaveFriend() {
    if (!this.friend) return;
    this.friendService.saveFriend(this.friend).subscribe({
      next: () => this.router.navigateByUrl('/friend'),
      error: (error) => console.error('Error saving friend', error),
    });
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
